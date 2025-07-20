import { FaArrowUp } from 'react-icons/fa'
import { FaArrowDown } from 'react-icons/fa'
import { Button } from '@/shared/shadcn/ui'

export const AnswerVote = () => {
	return (
		<div className='bg-secondary/20 flex flex-col items-center gap-2 rounded-lg p-2'>
			<Button variant='ghost' size='icon'>
				<FaArrowUp className='h-4 w-4' />
			</Button>
			<span>0</span>
			<Button variant='ghost' size='icon'>
				<FaArrowDown className='h-4 w-4' />
			</Button>
		</div>
	)
}
