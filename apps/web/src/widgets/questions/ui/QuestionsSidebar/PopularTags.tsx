import { Button } from '@/shared/shadcn/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import { TagRow } from '@/entities/tags'

export const PopularTags = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-base sm:text-lg'>
					Popular Tags
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex flex-col gap-2'>
					<TagRow
						tag={{
							name: 'tag1',
							id: 1,
							createdAt: new Date().toISOString()
						}}
					/>
					<TagRow
						tag={{
							name: 'tag2',
							id: 2,
							createdAt: new Date().toISOString()
						}}
					/>
				</div>
			</CardContent>
			<CardFooter className='pt-0'>
				<Button variant='ghost' className='w-full text-sm'>
					View All
				</Button>
			</CardFooter>
		</Card>
	)
}
