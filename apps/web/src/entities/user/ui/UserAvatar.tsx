import { cn } from '@/shared/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui'

interface UserAvatarProps {
	className?: string
	fallback?: string
	src?: string
}

export const UserAvatar = ({ className, fallback, src }: UserAvatarProps) => {
	return (
		<Avatar className={cn('size-10', className)}>
			<AvatarImage src={src} />

			<AvatarFallback>{fallback}</AvatarFallback>
		</Avatar>
	)
}
