'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/shared/shadcn/ui/input'
import { cn } from '../lib/utils'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription
} from '../shadcn/ui/form'

export type RHFInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	className?: string
	label?: string
	description?: string
}

export const RHFInput = (props: RHFInputProps) => {
	const { name, label, className, description, ...restOfProps } = props

	const { control } = useFormContext()

	return (
		<FormField
			name={name}
			control={control}
			render={({
				field: { ref, value, onChange, ...restOfFieldProps }
			}) => (
				<FormItem className={cn('w-full', className)}>
					{label && <FormLabel>{label}</FormLabel>}
					{description && (
						<FormDescription {...restOfFieldProps} {...restOfProps}>
							{description}
						</FormDescription>
					)}
					<FormControl className='rounded-md'>
						<Input
							value={value}
							ref={ref}
							onChange={onChange}
							{...restOfFieldProps}
							{...restOfProps}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
