import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcn/ui'

export const SimilarQuestions = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Similar Questions</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				<div className='flex flex-col'>
					<h3 className='font-medium'>
						How to handle JWT token expiration in React?
					</h3>
					<span className='text-muted-foreground text-xs'>
						23 answers
					</span>
				</div>
				<div className='flex flex-col'>
					<h3 className='font-medium'>
						Best practices for securing a Node.js REST API
					</h3>
					<span className='text-muted-foreground text-xs'>
						43 answers
					</span>
				</div>
				<div className='flex flex-col'>
					<h3 className='font-medium'>
						React authentication using Context API and JWT
					</h3>
					<span className='text-muted-foreground text-xs'>
						16 answers
					</span>
				</div>
				<div className='flex flex-col'>
					<h3 className='font-medium'>
						HttpOnly cookies vs localStorage for JWT storage
					</h3>
					<span className='text-muted-foreground text-xs'>
						16 answers
					</span>
				</div>
			</CardContent>
		</Card>
	)
}
