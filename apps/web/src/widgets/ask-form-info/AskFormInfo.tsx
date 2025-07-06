'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui'

const steps = [
	{
		title: '1. Write a clear, concise title',
		description: `
    Avoid vague titles like "Need help" or "Bug in code".
    Your title should summarize the problem in a few words. 
    It will be used as a search term to find your question.
    `
	},
	{
		title: '2. Explain the problem in detail',
		description:
			'Describe what you’re trying to do, what you expected to happen, and what actually happened. Share any relevant context.'
	},
	{
		title: '3. Show what you’ve tried',
		description:
			'Include any code, configurations, queries, or examples you’ve already tried. This helps others understand your effort.'
	},
	{
		title: '4. Use proper formatting',
		description:
			'Use code blocks for code, bullet points for lists, and paragraphs to make your question readable.'
	},
	{
		title: '5. Add relevant tags',
		description:
			'Tags help others find your question. Include frameworks, languages, or technologies you’re asking about.'
	},
	{
		title: '6. Proofread before posting',
		description:
			'Double-check your grammar and clarity. Make sure the question makes sense to someone unfamiliar with your specific case.'
	}
]

export function AskFormInfo() {
	return (
		<Card className='w-full rounded-md border shadow-sm md:w-[40%]'>
			<CardHeader>
				<CardTitle className='text-base font-semibold'>
					📘 How to Ask a Good Question
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Accordion type='multiple' className='w-full'>
					{steps.map((step, index) => (
						<AccordionItem key={index} value={`item-${index}`}>
							<AccordionTrigger className='text-muted-foreground text-left text-sm font-medium'>
								{step.title}
							</AccordionTrigger>
							<AccordionContent className='text-muted-foreground text-sm'>
								{step.description}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</CardContent>
		</Card>
	)
}
