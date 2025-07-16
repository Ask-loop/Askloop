import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormProvider } from '@/shared/form-controls'
import { Button, FormField, FormItem } from '@/shared/shadcn/ui'
import { SOCKET_EVENTS } from '@/shared/sockets/events'
import { socket } from '@/shared/sockets/socket'
import { MarkdownEditor } from '@/shared/ui'
import { useAnswers } from '../hooks/queries'
import { AnswerInput } from '../model/answers.types'

type AnswerFormProps = {
	questionId: number
}

export const AnswerForm = ({ questionId }: AnswerFormProps) => {
	const { refetch } = useAnswers(questionId)

	const form = useForm({
		defaultValues: {
			content: ''
		}
	})

	useEffect(() => {
		socket.connect()

		socket.emit(SOCKET_EVENTS.JOIN_QUESTION, questionId)

		socket.on(SOCKET_EVENTS.ANSWER_CREATED, answer => {
			console.log(answer)
			form.reset()
			refetch()
		})

		return () => {
			socket.disconnect()
		}
	}, [])

	const onSubmit = (data: AnswerInput) => {
		socket.emit(SOCKET_EVENTS.CREATE_ANSWER, {
			questionId,
			content: data.content
		})
	}

	return (
		<FormProvider className='mt-4' methods={form} onSubmit={onSubmit}>
			<FormField
				control={form.control}
				name='content'
				render={({ field }) => (
					<FormItem>
						<MarkdownEditor
							className='bg-card!'
							value={field.value || ''}
							onChange={field.onChange}
							placeholder='Write your answer here...'
						/>
					</FormItem>
				)}
			/>

			<Button type='submit' className='mt-4'>
				Post your answer
			</Button>
		</FormProvider>
	)
}
