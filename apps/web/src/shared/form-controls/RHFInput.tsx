'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/shared/shadcn/ui/input'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../shadcn/ui/form'

export type RHFInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	name: string
	className?: string
	label?: string
}

export const RHFInput = (props: RHFInputProps) => {
	const { name, label, className, ...restOfProps } = props

	const { control } = useFormContext()

	return (
		<FormField
			name={name}
			control={control}
			render={({
				field: { ref, value, onChange, ...restOfFieldProps }
			}) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
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
