import { MessageCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../lib/utils'
import { ROUTES } from '@/constants'

type AskLoopLogoProps = {
	className?: string
	notLink?: boolean
}

export const AskLoopLogo = ({ className, notLink }: AskLoopLogoProps) => (
	<>
		{notLink ? (
			<div className={cn('flex items-center gap-2', className)}>
				<MessageCircleIcon className='h-5 w-5' />
				<span className='text-base font-bold'>AskLoop</span>
			</div>
		) : (
			<Link href={ROUTES.home} className='flex items-center gap-2'>
				<MessageCircleIcon className='h-5 w-5' />
				<span className='text-base font-bold'>AskLoop</span>
			</Link>
		)}
	</>
)
