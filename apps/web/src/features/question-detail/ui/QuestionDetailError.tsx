import { useRouter } from 'next/navigation'
import { IoWarning } from 'react-icons/io5'
import { Alert, AlertDescription, AlertTitle } from '@/shared/shadcn/ui/alert'
import { Button } from '@/shared/shadcn/ui/button'

export const QuestionDetailError = () => {
	const router = useRouter()

	return (
		<div className='flex flex-col items-center justify-center gap-4 py-12'>
			<Alert variant='destructive' className='w-full max-w-md'>
				<IoWarning className='h-4 w-4' />
				<AlertTitle>Error loading question</AlertTitle>
			</Alert>

			<div className='flex gap-2'>
				<Button variant='outline' onClick={() => router.back()}>
					Go back
				</Button>
				<Button onClick={() => window.location.reload()}>
					Try again
				</Button>
			</div>
		</div>
	)
}
