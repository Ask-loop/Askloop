import { HelpCenter } from './HelpCenter'
import { PopularTags } from './PopularTags'
import { TopContributors } from './TopContributors'

export const QuestionsSidebar = () => {
	return (
		<div className='grid gap-4 sm:gap-6'>
			<PopularTags />
			<TopContributors />
			<HelpCenter />
		</div>
	)
}
