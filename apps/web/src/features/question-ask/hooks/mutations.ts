import { useMutation } from '@tanstack/react-query'
import { AskQuestionInput } from '@/features/question-ask/model'
import { askQuestion } from '@/shared/api/question'
import { useInvalidateQueries } from '@/shared/lib'
import {
	toastCatchError,
	toastSuccess
} from '@/shared/utils/toast-message-handler'

export const useAskQuestion = () => {
	const { invalidateQuestions } = useInvalidateQueries()

	const { mutate, isPending } = useMutation({
		mutationFn: (data: AskQuestionInput) => askQuestion(data),
		onSuccess: () => {
			toastSuccess('Question asked successfully')
		},
		onError: () => {
			toastCatchError('Failed to ask question')
		},
		onSettled: () => {
			invalidateQuestions({ page: 1, limit: 10 })
		}
	})

	return { mutate, isPending }
}
