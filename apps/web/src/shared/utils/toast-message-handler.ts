import { isAxiosError } from 'axios'
import { toast } from 'sonner'

const defaultErrorMessage = 'Something went wrong'
const TYPE_ERROR = 'TypeError'

type ToastMessageHandlerProps = {
	type: 'error' | 'success' | 'warning' | 'info'
	content: unknown
}

const getErrorMessage = (error: unknown) => {
	if (isAxiosError(error)) {
		return error.response?.data.message || error.message || defaultErrorMessage
	}
	if (error instanceof Error) {
		return error.message || defaultErrorMessage
	}
}

const toastMessageHandler = ({ type, content }: ToastMessageHandlerProps) => {
	const isError = content instanceof Error

	if (isError && content.name === TYPE_ERROR) {
		return
	}

	const isAxiosErrors = isAxiosError(content)
	const hasError = isAxiosErrors || isError
	const toastType = hasError ? 'error' : type

	if (hasError) {
		const errorMessage = getErrorMessage(content)

		toast.error(errorMessage)

		return
	}

	toast[toastType](content as string)
}

export const toastCatchError = (error: unknown) => {
	toastMessageHandler({ type: 'error', content: error })
}

export const toastSuccess = (content: unknown) => {
	toastMessageHandler({ type: 'success', content })
}

export const toastWarning = (content: unknown) => {
	toastMessageHandler({ type: 'warning', content })
}

export const toastInfo = (content: unknown) => {
	toastMessageHandler({ type: 'info', content })
}
