import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcn/ui'

type QuestionStatsProps = {
	asked: string
	views: number
	answers: number
}

export const QuestionStats = ({
	asked,
	views,
	answers
}: QuestionStatsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Question Stats</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Asked</span>
					<span>{asked}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Views</span>
					<span>{views}</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Answers</span>
					<span>{answers}</span>
				</div>
			</CardContent>
		</Card>
	)
}
