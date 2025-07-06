'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { useBoolean } from 'usehooks-ts'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../shadcn/ui/form'
import { Input } from '../shadcn/ui/input'

export type RHFInputPasswordProps =
	React.InputHTMLAttributes<HTMLInputElement> & {
		name: string
		label?: string
		className?: string
		description?: string
	}

export const RHFInputPassword = ({
	name,
	label,
	className,
	description,
	...rest
}: RHFInputPasswordProps) => {
	const { control } = useFormContext()
	const { value: showPassword, setTrue, setFalse } = useBoolean(false)

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Input
							{...field}
							{...rest}
							type={showPassword ? 'text' : 'password'}
							icon={
								showPassword ? (
									<EyeOffIcon
										onClick={setFalse}
										className='text-muted-foreground size-4 cursor-pointer'
									/>
								) : (
									<EyeIcon
										onClick={setTrue}
										className='text-muted-foreground size-4 cursor-pointer'
									/>
								)
							}
							iconPosition='right'
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
