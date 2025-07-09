import { Separator } from '@radix-ui/react-dropdown-menu'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import { Contributor } from '@/entities/user'

export const TopContributors = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-base sm:text-lg'>
					Top Contributors
				</CardTitle>
			</CardHeader>

			<CardContent className='flex flex-col gap-2'>
				<Contributor
					avatar='https://github.com/shadcn.png'
					name='John Doe'
					points={100}
					questionsCount={10}
				/>
				<Contributor
					avatar='https://github.com/shadcn.png'
					name='John Doe'
					points={100}
					questionsCount={10}
				/>
				<Contributor
					avatar='https://github.com/shadcn.png'
					name='John Doe'
					points={100}
					questionsCount={10}
				/>
			</CardContent>

			<Separator />

			<CardFooter className='pt-0'>
				<Button variant='ghost' className='w-full text-sm'>
					View leaderboard
				</Button>
			</CardFooter>
		</Card>
	)
}
