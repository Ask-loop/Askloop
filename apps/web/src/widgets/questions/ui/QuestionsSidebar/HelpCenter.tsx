import { ArrowRightIcon, HelpCircleIcon } from 'lucide-react'
import { Button } from '@/shared/shadcn/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle
} from '@/shared/shadcn/ui/card'
import dictionary from '@/dictionary/en'

export const HelpCenter = () => {
	return (
		<Card className='border-none bg-transparent shadow-none'>
			<CardHeader>
				<CardTitle className='text-base sm:text-lg'>
					{dictionary.needHelp}
				</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-2'>
				<p className='text-muted-foreground text-sm'>
					{dictionary.checkOutOurGuides}
				</p>
				<Button variant='link' className='w-fit p-0 text-sm'>
					{dictionary.visitHelpCenter}{' '}
					<ArrowRightIcon className='h-3 w-3 sm:h-4 sm:w-4' />
				</Button>
			</CardContent>
		</Card>
	)
}
