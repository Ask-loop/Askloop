import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa6'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/shared/shadcn/ui/button'

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.2
		}
	}
}

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 10
		}
	}
}

export const OAuthButtons = () => {
	return (
		<motion.div
			initial='hidden'
			animate='visible'
			variants={containerVariants}
			className='flex flex-col gap-2'
		>
			<Button variant='outline' className='w-full rounded-full'>
				<FcGoogle className='mr-2 h-4 w-4' />
				Continue with Google
			</Button>
			<Button variant='outline' className='w-full rounded-full'>
				<FaGithub className='mr-2 h-4 w-4' />
				Continue with GitHub
			</Button>

			<p className='text-muted-foreground relative text-center text-sm'>
				<span className='bg-border absolute inset-0 top-1/2 z-10 h-px w-full -translate-y-1/2' />
				<span className='bg-background text-muted-foreground relative z-20 px-2'>
					Or continue with
				</span>
			</p>
		</motion.div>
	)
}
