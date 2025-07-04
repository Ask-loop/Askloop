'use client'

import { useFormContext } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/shadcn/ui/form'
import { Textarea } from '@/shared/shadcn/ui/textarea'

export type RHFTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	name: string
	label?: string
	className?: string
}

export const RHFTextarea = ({ name, label, className, ...rest }: RHFTextareaProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Textarea {...field} className={className} {...rest} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
