'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { FormProvider, RHFInput } from '@/shared/form-controls'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/shadcn/ui/form'
import { MarkdownEditor } from '@/shared/ui'
import { TAGS } from '../config/constants'
import { AskQuestionInput, askQuestionSchema } from '../model'
import { TagInput } from './TagInput'

export const AskForm = () => {
	const form = useForm<AskQuestionInput>({
		mode: 'onSubmit',
		resolver: zodResolver(askQuestionSchema),
		defaultValues: {
			title: '',
			body: '',
			tags: []
		}
	})

	const onSubmit = (data: AskQuestionInput) => {
		console.log(data)
	}

	return (
		<FormProvider
			className='w-full space-y-4 md:w-[60%]'
			methods={form}
			onSubmit={onSubmit}
		>
			<RHFInput
				description='Be specific and imagine you’re asking a question to another person'
				name='title'
				label='Title'
			/>

			<FormField
				control={form.control}
				name='body'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Body</FormLabel>
						<FormDescription>
							Include all the information someone would need to
							answer your question
						</FormDescription>
						<FormControl>
							<MarkdownEditor
								placeholder='Write your question here...'
								value={field.value || ''}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={form.control}
				name='tags'
				render={({ field }) => (
					<FormItem>
						<FormLabel>Tags</FormLabel>
						<FormDescription>
							Add up to 5 tags to describe what your question is
							about
						</FormDescription>
						<FormControl>
							<TagInput
								value={field.value}
								onChange={field.onChange}
								options={TAGS}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button type='submit'>Submit</Button>
		</FormProvider>
	)
}
