import { Question, Answer } from '@/shared/api/question/types'

export type QuestionDetail = Question & {
	// Add any extra fields if needed for detail view
	// e.g., similarQuestions?: Question[]
}

export type QuestionDetailAnswer = Answer

export type QuestionRightBarStats = {
	asked: string
	views: number
	answers: number
}

export type QuestionRightBarSimilarQuestion = {
	id: number
	title: string
	answersCount: number
}

export type QuestionRightBarProps = {
	stats: QuestionRightBarStats
	similarQuestions: QuestionRightBarSimilarQuestion[]
}

export type Comment = {
	id: number
	content: string
	author: {
		id: number
		displayName: string
		picture?: string
	}
	createdAt: string
	updatedAt: string
	parentId?: number // for future threading
}
