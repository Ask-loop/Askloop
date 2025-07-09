import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'
import { AuthEndpoints } from '@/features/auth/api/endpoints'
import {
	clearAuthCookie,
	getAuthCookie,
	setAuthCookie
} from '@/features/auth/lib/cookie'
import { useAuthStore } from '@/features/auth/model/auth.store'
import { ApiResponse } from '../types'
import { User } from '../types/user.types'
import { toastCatchError } from '../utils/toast-message-handler'
import { ROUTES } from '@/constants'

class Instance {
	private instance: AxiosInstance
	private isRefreshing = false
	private refreshQueue: {
		resolve: (value: string | null) => void
		reject: (error: unknown) => void
	}[] = []

	constructor() {
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
			timeout: 10000,
			withCredentials: true,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		this.instance.interceptors.request.use(this.handleRequest)
		this.instance.interceptors.response.use(
			this.handleResponse,
			this.handleError.bind(this)
		)
	}

	private async handleRequest(config: InternalAxiosRequestConfig) {
		const tokens = await getAuthCookie()
		const accessToken = tokens?.accessToken

		if (accessToken) {
			config.headers.set('Authorization', `Bearer ${accessToken}`)
		}

		return config
	}

	private handleResponse(response: AxiosResponse) {
		return response
	}

	private async handleError(error: AxiosError) {
		const originalRequest = error.config as AxiosRequestConfig & {
			_retry?: boolean
		}

		if (
			(error.response?.status === 401 ||
				error.response?.status === 403) &&
			!originalRequest._retry
		) {
			originalRequest._retry = true

			const tokens = await getAuthCookie()
			const refreshToken = tokens?.refreshToken

			if (!refreshToken) {
				await this.logout()
				return Promise.reject(error)
			}

			if (this.isRefreshing) {
				return new Promise((resolve, reject) => {
					this.refreshQueue.push({ resolve, reject })
				}).then((token: unknown) => {
					if (token) {
						originalRequest.headers = {
							...originalRequest.headers,
							Authorization: `Bearer ${token}`
						}
						return this.instance(originalRequest)
					}
				})
			}

			this.isRefreshing = true

			try {
				const response = await this.refreshTokens(refreshToken)

				const {
					accessToken,
					refreshToken: newRefreshToken,
					user
				} = response

				await setAuthCookie({
					accessToken,
					refreshToken: newRefreshToken
				})

				useAuthStore.getState().setUser(user)

				this.processQueue(null, accessToken)

				originalRequest.headers = {
					...originalRequest.headers,
					Authorization: `Bearer ${accessToken}`
				}

				return this.instance(originalRequest)
			} catch (refreshError) {
				this.processQueue(refreshError, null)
				await this.logout()
				return Promise.reject(refreshError)
			} finally {
				this.isRefreshing = false
			}
		}
		return Promise.reject(error)
	}

	private async processQueue(error: unknown, token: string | null) {
		this.refreshQueue.forEach(promise => {
			if (error) {
				promise.reject(error)
			} else {
				promise.resolve(token)
			}
		})
		this.refreshQueue = []
	}

	private async refreshTokens(refreshToken: string) {
		const response = await this.post<
			ApiResponse<{
				accessToken: string
				refreshToken: string
				user: User
			}>
		>('/auth/refresh-tokens', { refreshToken })

		return response.data
	}

	private async logout() {
		await clearAuthCookie()
		await this.instance.post(AuthEndpoints.SignOut)
		useAuthStore.getState().signOut()

		if (typeof window !== 'undefined') {
			toastCatchError('Session expired. Please sign in again.')
			window.location.replace(ROUTES.signIn)
		}
	}

	async get<T>(url: string, config?: AxiosRequestConfig) {
		const response = await this.instance.get<T>(url, config)

		return response?.data
	}

	async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		const response = await this.instance.post<T>(url, data, config)

		return response?.data
	}

	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await this.instance.put<T>(url, data, config)

		return response?.data
	}

	async delete<T>(url: string, config?: AxiosRequestConfig) {
		const response = await this.instance.delete<T>(url, config)

		return response?.data
	}

	async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await this.instance.patch<T>(url, data, config)

		return response?.data
	}
}

export const axiosInstance = new Instance()
