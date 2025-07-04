'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '../shadcn/ui/button'
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
	}

export const RHFInputPassword = ({
	name,
	label,
	className,
	...rest
}: RHFInputPasswordProps) => {
	const { control } = useFormContext()
	const [showPassword, setShowPassword] = useState(false)

	const toggle = () => setShowPassword(prev => !prev)

	return (
		<FormField
			name={name}
			control={control}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}
					<FormControl>
						<div className='relative'>
							<Input
								{...field}
								{...rest}
								type={showPassword ? 'text' : 'password'}
							/>
							<Button
								variant='ghost'
								size='icon'
								className='absolute top-1/2 right-2 h-auto -translate-y-1/2 p-1'
								onClick={toggle}
								type='button'
								tabIndex={-1}
							>
								{showPassword ? (
									<EyeOffIcon className='h-4 w-4' />
								) : (
									<EyeIcon className='h-4 w-4' />
								)}
							</Button>
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
