import { type Metadata } from 'next'
import { QuestionAsk } from '@/views/questions'

export const metadata: Metadata = {
	title: 'Ask a question',
	description: 'Ask a question to the community'
}

export default function AskPage() {
	return <QuestionAsk />
}
