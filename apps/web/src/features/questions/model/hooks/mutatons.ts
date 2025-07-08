import { useMutation } from '@tanstack/react-query'
import {
	toastCatchError,
	toastSuccess
} from '@/shared/utils/toast-message-handler'
import { askQuestion } from '../../api/questons'
import { AskQuestionInput } from '../../ask/model'
import { useInvalidateQueries } from '../../lib'

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
