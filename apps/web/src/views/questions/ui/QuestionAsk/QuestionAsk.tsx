import React from 'react'
import { AskForm } from '@/features/question-ask'
import { AskFormInfo } from '@/widgets/ask-form-info'

export const QuestionAsk = () => {
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
