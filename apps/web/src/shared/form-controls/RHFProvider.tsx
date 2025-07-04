import React from 'react'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { Form } from '../shadcn/ui/form'

export type FormProviderProps = Omit<
	React.FormHTMLAttributes<HTMLFormElement>,
	'onSubmit'
> & {
	methods: UseFormReturn<any>
	onSubmit: SubmitHandler<any>
	fullWidth?: boolean
}

export const FormProvider = (props: FormProviderProps) => {
	const { methods, onSubmit, children, fullWidth, ...restOfProps } = props
	const { handleSubmit } = methods

	return (
		<Form {...methods}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				{...restOfProps}
				style={fullWidth ? { width: '100%' } : {}}
			>
				{children}
			</form>
		</Form>
	)
}
