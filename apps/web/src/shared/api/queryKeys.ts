import { GetQuestionsReq } from '../types/question'
import { GetTagsReq } from '../types/tag'

export const queryKeys = {
	questions: (params: GetQuestionsReq) => ['questions', params],
	tags: (params: GetTagsReq) => ['tags', params],
	question: (slug: string) => ['question', slug]
}
