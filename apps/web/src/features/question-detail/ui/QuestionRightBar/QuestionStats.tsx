import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcn/ui'

export const QuestionStats = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Question Stats</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Asked</span>
					<span>July 9, 2025</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Views</span>
					<span>122</span>
				</div>
				<div className='flex items-center justify-between'>
					<span className='text-muted-foreground'>Answers</span>
					<span>2</span>
				</div>
			</CardContent>
		</Card>
	)
}
