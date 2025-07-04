import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios'
import { clearCookie, getUserCookie } from '@/features/auth/lib'
import { ROUTES } from '@/constants'

class Instance {
	private instance: AxiosInstance

	constructor() {
		this.instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_API_URL,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		this.instance.interceptors.request.use(this.handleRequest)
		this.instance.interceptors.response.use(
			this.handleResponse,
			this.handleError
		)
	}

	private async handleRequest(config: InternalAxiosRequestConfig) {
		const tokens = await getUserCookie()
		const accessToken = tokens?.accessToken

		if (accessToken) {
			config.headers.set('Authorization', `Bearer ${accessToken}`)
		}

		return config
	}

	private handleResponse(response: AxiosResponse) {
		return response
	}

	private handleError(error: AxiosError) {
		if (error.response?.status === 401) {
			clearCookie()

			if (typeof window !== 'undefined') {
				window.location.replace(ROUTES.signIn)
			}
		}
	}

	async get<T>(url: string, config?: AxiosRequestConfig) {
		const response = await this.instance.get<T>(url, config)

		return response.data
	}

	async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
		const response = await this.instance.post<T>(url, data, config)

		return response.data
	}

	async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await this.instance.put<T>(url, data, config)

		return response.data
	}

	async delete<T>(url: string, config?: AxiosRequestConfig) {
		const response = await this.instance.delete<T>(url, config)

		return response.data
	}

	async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
		const response = await this.instance.patch<T>(url, data, config)

		return response.data
	}
}

export const axiosInstance = new Instance()
