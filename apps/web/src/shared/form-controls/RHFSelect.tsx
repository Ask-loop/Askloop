'use client'

import { useFormContext } from 'react-hook-form'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/shadcn/ui/form'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/shadcn/ui/select'

export type RHFSelectProps = {
	name: string
	label?: string
	options: { label: string; value: string }[]
	placeholder?: string
}

export const RHFSelect = ({
	name,
	label,
	options,
	placeholder
}: RHFSelectProps) => {
	const { control } = useFormContext()

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
							value={field.value}
						>
							<SelectTrigger>
								<SelectValue
									placeholder={
										placeholder || 'Select an option'
									}
								/>
							</SelectTrigger>
							<SelectContent>
								{options.map(opt => (
									<SelectItem
										key={opt.value}
										value={opt.value}
									>
										{opt.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
