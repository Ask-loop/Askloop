import { GetTagsReq } from '../types'
import { GetQuestionsReq } from './question'

export const queryKeys = {
	questions: (params: GetQuestionsReq) => ['questions', params],
	tags: (params: GetTagsReq) => ['tags', params],
	question: (slug: string) => ['question', slug],
	questionBySlug: (slug: string) => ['question', 'slug', slug],
	answersByQuestion: (questionId: number) => [
		'answers',
		'question',
		questionId
	],
	answerById: (id: number) => ['answer', id],
	commentsByQuestion: (questionId: number) => [
		'comments',
		'question',
		questionId
	],
	commentsByAnswer: (answerId: number) => ['comments', 'answer', answerId],
	commentById: (id: number) => ['comment', id]
}
