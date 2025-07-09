import { GetTagsReq } from '../types'
import { GetQuestionsReq } from './question'

export const queryKeys = {
	questions: (params: GetQuestionsReq) => ['questions', params],
	tags: (params: GetTagsReq) => ['tags', params],
	question: (slug: string) => ['question', slug]
}
