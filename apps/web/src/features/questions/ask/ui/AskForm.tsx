'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounceValue } from 'usehooks-ts'
import { FormProvider, RHFInput } from '@/shared/form-controls'
import { Button } from '@/shared/shadcn/ui/button'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/shadcn/ui/form'
import { MarkdownEditor } from '@/shared/ui'
import { useAskQuestion } from '../../model/hooks/mutatons'
import { useGetTags } from '../../model/hooks/queries'
import { AskQuestionInput, askQuestionSchema } from '../model'
import { TagInput } from './TagInput'
import { ROUTES } from '@/constants'

export const AskForm = () => {
	const router = useRouter()

	const { mutate, isPending } = useAskQuestion()
	const [debouncedSearch, setDebouncedSearch] = useDebounceValue('', 500)

	const form = useForm<AskQuestionInput>({
		mode: 'onSubmit',
		resolver: zodResolver(askQuestionSchema),
		defaultValues: {
			title: '',
			body: '',
			tagIds: []
		}
	})

	const { data } = useGetTags({
		search: debouncedSearch || undefined
	})

	const tags = useMemo(() => {
		return data?.tags.map(tag => ({
			label: tag.name,
			value: tag.id
		}))
	}, [data?.tags])

	const onSubmit = (data: AskQuestionInput) => {
		mutate(data, {
			onSuccess: question => {
				router.push(ROUTES.question.replace(':slug', question.slug))
			}
		})
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
				name='tagIds'
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
								options={tags || []}
								onSearchChange={setDebouncedSearch}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button isLoading={isPending} type='submit'>
				Submit
			</Button>
		</FormProvider>
	)
}
