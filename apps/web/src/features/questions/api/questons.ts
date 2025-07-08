import { axiosInstance } from '@/shared/api'
import { ApiResponse } from '@/shared/types/common.types'
import {
	GetQuestionsReq,
	GetQuestionsResponse,
	Question
} from '@/shared/types/question'
import { GetTagsReq, GetTagsResponse } from '@/shared/types/tag'
import { AskQuestionInput } from '../ask/model'
import { QuestionsEndpoints } from './endpoints'

export const getQuestions = async (params: GetQuestionsReq) => {
	const response = await axiosInstance.get<ApiResponse<GetQuestionsResponse>>(
		QuestionsEndpoints.Questions,
		{ params }
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
