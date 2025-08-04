import qs from 'qs'
import { AskQuestionInput } from '@/features/question-ask/model'
import { axiosInstance } from '@/shared/api'
import { GetTagsReq, GetTagsResponse } from '@/shared/types'
import { ApiResponse } from '@/shared/types/common.types'
import { QuestionsEndpoints } from './endpoints'
import {
	Answer,
	GetQuestionsReq,
	GetQuestionsResponse,
	Question
} from './types'

export const getQuestions = async (params: GetQuestionsReq) => {
	const response = await axiosInstance.get<ApiResponse<GetQuestionsResponse>>(
		QuestionsEndpoints.Questions,
		{
			params,
			paramsSerializer: params =>
				qs.stringify(params, { arrayFormat: 'repeat' })
		}
	)

	return response.data
}

export const askQuestion = async (data: AskQuestionInput) => {
	const response = await axiosInstance.post<ApiResponse<Question>>(
		QuestionsEndpoints.Questions,
		data
	)

	return response.data
}

export const getTags = async (params: GetTagsReq) => {
	const response = await axiosInstance.get<ApiResponse<GetTagsResponse>>(
		QuestionsEndpoints.Tags,
		{ params }
	)

	return response.data
}

export const getQuestionBySlug = async (slug: string) => {
	const response = await axiosInstance.get<ApiResponse<Question>>(
		`${QuestionsEndpoints.QuestionBySlug.replace(':slug', slug)}`
	)

	return response.data
}

export const getAnswersByQuestion = async (questionId: number) => {
	const response = await axiosInstance.get<ApiResponse<Answer[]>>(
		`${QuestionsEndpoints.AnswersByQuestion.replace(':questionId', questionId.toString())}`
	)

	return response.data
}
