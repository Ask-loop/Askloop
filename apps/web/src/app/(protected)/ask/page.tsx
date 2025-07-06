import { type Metadata } from 'next'
import { AskForm } from '@/features/questions/ask/ui'
import { AskFormInfo } from '@/widgets/ask-form-info'

export const metadata: Metadata = {
	title: 'Ask a question',
	description: 'Ask a question to the community'
}

export default function AskPage() {
	return (
		<div className='flex flex-col gap-4'>
			<h1 className='text-2xl font-bold'>Ask a question</h1>
			<div className='flex w-full flex-col gap-8 md:flex-row md:gap-6'>
				<AskForm />
				<AskFormInfo />
			</div>
		</div>
	)
}
