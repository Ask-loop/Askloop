import { Loader2 } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

type SpinnerProps = {
	size?: number
	className?: string
}

export const Spinner = ({ size = 10, className }: SpinnerProps) => {
	return (
		<Loader2
			className={cn('text-primary mx-auto animate-spin', className)}
			style={{ width: size, height: size }}
		/>
	)
}
