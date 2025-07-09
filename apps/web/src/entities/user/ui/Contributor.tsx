import Link from 'next/link'
import { UserAvatar } from './UserAvatar'

type ContributorProps = {
	avatar: string
	name: string
	points: number
	questionsCount: number
}

export const Contributor = ({
	avatar,
	name,
	points,
	questionsCount
}: ContributorProps) => {
	return (
		<Link
			className='hover:bg-muted flex flex-row items-center justify-between rounded-md px-2 py-1'
			href={'#'}
		>
			<div className='flex flex-row items-center gap-2'>
				<UserAvatar src={avatar} fallback={name.charAt(0)} />
				<div className='flex flex-col'>
					<span className='text-sm font-medium'>{name}</span>
					<span className='text-muted-foreground text-xs'>
						{points} points
					</span>
				</div>
			</div>
			<span className='text-muted-foreground text-xs'>
				{questionsCount} questions
			</span>
		</Link>
	)
}
