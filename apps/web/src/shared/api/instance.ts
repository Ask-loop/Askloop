import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'
import { AuthEndpoints } from '@/features/auth/api/endpoints'
import { clearAuthCookie, getAuthCookie } from '@/features/auth/lib/cookie'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { ApiResponse } from '../types'
import { User } from '../types/user.types'
import { toastCatchError } from '../utils/toast-message-handler'
import { ROUTES } from '@/constants'

interface RefreshQueueItem {
	resolve: (token?: string) => void
	reject: (error: unknown) => void
}

interface RetryableRequest extends AxiosRequestConfig {
	_retry?: boolean
}
class Instance {
	private instance: AxiosInstance
	private isRefreshing = false
	private refreshQueue: RefreshQueueItem[] = []

	constructor() {
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
			timeout: 10_000,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		this.instance.interceptors.request.use(this.handleRequest.bind(this))
		this.instance.interceptors.response.use(
			this.handleResponse,
			this.handleError.bind(this)
		)
	}

	private async handleRequest(
		config: InternalAxiosRequestConfig
	): Promise<InternalAxiosRequestConfig> {
		const tokens = await getAuthCookie()

		if (tokens?.accessToken) {
			config.headers.set('Authorization', `Bearer ${tokens.accessToken}`)
		}

		return config
	}

	private handleResponse(response: AxiosResponse): AxiosResponse {
		return response
	}

	private async handleError(error: AxiosError): Promise<AxiosResponse> {
		const originalRequest = error.config as RetryableRequest

		if (!this.shouldAttemptTokenRefresh(error, originalRequest)) {
			throw error
		}

		originalRequest._retry = true

		const tokens = await getAuthCookie()
		if (!tokens?.refreshToken) {
			await this.handleLogout()
			throw error
		}

		if (this.isRefreshing) {
			return this.queueRequest(originalRequest)
		}

		return this.refreshTokensAndRetry(originalRequest, tokens.refreshToken)
	}

	private shouldAttemptTokenRefresh(
		error: AxiosError,
		request: RetryableRequest
	): boolean {
		const isAuthError =
			error.response?.status === 401 || error.response?.status === 403
		const isNotRetried = !request._retry
		const isNotSignOut = request.url !== AuthEndpoints.SignOut

		return isAuthError && isNotRetried && isNotSignOut
	}

	private async queueRequest(
		originalRequest: RetryableRequest
	): Promise<AxiosResponse> {
		return new Promise<AxiosResponse>((resolve, reject) => {
			this.refreshQueue.push({
				resolve: (token?: string) => {
					if (token) {
						originalRequest.headers = {
							...originalRequest.headers,
							Authorization: `Bearer ${token}`
						}
						this.instance(originalRequest)
							.then(resolve)
							.catch(reject)
					} else {
						reject(new Error('Token refresh failed'))
					}
				},
				reject
			})
		})
	}

	private async refreshTokensAndRetry(
		originalRequest: RetryableRequest,
		refreshToken: string
	): Promise<AxiosResponse> {
		this.isRefreshing = true

		try {
			const user = await this.performTokenRefresh(refreshToken)
			useAuthStore.getState().setUser(user)

			const newTokens = await getAuthCookie()
			const newAccessToken = newTokens?.accessToken

			this.processQueue(undefined, newAccessToken || undefined)

			return this.instance(originalRequest)
		} catch (refreshError) {
			this.processQueue(refreshError)
			await this.handleLogout()
			throw refreshError
		} finally {
			this.isRefreshing = false
		}
	}

	private processQueue(error: unknown, token?: string): void {
		for (const { resolve, reject } of this.refreshQueue) {
			if (error) {
				reject(error)
			} else {
				resolve(token)
			}
		}
		this.refreshQueue = []
	}

	private async performTokenRefresh(refreshToken: string): Promise<User> {
		const response = await this.post<ApiResponse<User>>(
			AuthEndpoints.RefreshTokens,
			{ refreshToken }
		)

		return response.data
	}

	private async handleLogout(): Promise<void> {
		const tokens = await getAuthCookie()

		try {
			await clearAuthCookie()
			useAuthStore.getState().signOut()

			if (globalThis.window !== undefined) {
				toastCatchError('Session expired. Please sign in again.')
				globalThis.location.replace(ROUTES.signIn)
			}

			console.log(tokens)

			if (tokens?.accessToken) {
				await this.notifyServerLogout(tokens.accessToken)
			}
		} catch (error) {
			toastCatchError(error)
		}
	}

	private async notifyServerLogout(accessToken: string): Promise<void> {
		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}${AuthEndpoints.SignOut}`,
			undefined,
			{
				withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.get<T>(url, config)
		return response.data
	}

	async post<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.instance.post<T>(url, data, config)
		return response.data
	}

	async put<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.instance.put<T>(url, data, config)
		return response.data
	}

	async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.instance.delete<T>(url, config)
		return response.data
	}

	async patch<T>(
		url: string,
		data?: unknown,
		config?: AxiosRequestConfig
	): Promise<T> {
		const response = await this.instance.patch<T>(url, data, config)
		return response.data
	}
}

export const axiosInstance = new Instance()
