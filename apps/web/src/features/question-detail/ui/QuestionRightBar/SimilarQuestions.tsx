import { Card, CardContent, CardHeader, CardTitle } from '@/shared/shadcn/ui'

type SimilarQuestionsProps = {
	questions: Array<{
		id: number
		title: string
		answersCount: number
	}>
}

export const SimilarQuestions = ({ questions }: SimilarQuestionsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Similar Questions</CardTitle>
			</CardHeader>
			<CardContent className='space-y-2'>
				{!questions?.length ? (
					<span className='text-muted-foreground text-xs'>
						No similar questions found.
					</span>
				) : (
					questions.map(q => (
						<div key={q.id} className='flex flex-col'>
							<h3 className='font-medium'>{q.title}</h3>
							<span className='text-muted-foreground text-xs'>
								{q.answersCount} answers
							</span>
						</div>
					))
				)}
			</CardContent>
		</Card>
	)
}
