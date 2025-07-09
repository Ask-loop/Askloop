import { QuestionsHeader, QuestionsList } from '@/widgets/questions'
import { QuestionsSidebar } from '@/widgets/questions/ui/QuestionsSidebar'

export const Questions = () => {
	return (
		<div className='grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6'>
			<div className='lg:col-span-2'>
				<QuestionsHeader />
				<QuestionsList />
			</div>

			<div className='lg:col-span-1'>
				<QuestionsSidebar />
			</div>
		</div>
	)
}
