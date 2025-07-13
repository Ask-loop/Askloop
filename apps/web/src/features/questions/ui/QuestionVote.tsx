import React from 'react'
import { IoCaretUpOutline, IoCaretDownOutline } from 'react-icons/io5'
import { Button } from '@/shared/shadcn/ui'

type QuestionVoteProps = {
	votesQount: number
}

export const QuestionVote = ({ votesQount }: QuestionVoteProps) => {
	return (
		<div className='g-4 flex flex-col items-center'>
			<Button size={'sm'} variant={'ghost'}>
				<IoCaretUpOutline />
			</Button>
			<span className='text-muted-foreground text-xl'>{votesQount}</span>
			<Button size={'sm'} variant={'ghost'}>
				<IoCaretDownOutline />
			</Button>
		</div>
	)
}
