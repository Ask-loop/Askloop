import { Tag } from '@/shared/types/tag'

type TagRowProps = {
	tag: Tag
}

export const TagRow = ({ tag }: TagRowProps) => {
	return (
		<div className='relative flex flex-row items-center justify-between py-1 pl-4'>
			<span className='bg-foreground absolute top-1/2 left-0 h-[10px] w-[10px] -translate-y-1/2 rounded-full' />
			<span className='text-primary text-sm font-medium'>{tag.name}</span>
			<span className='text-muted-foreground text-xs'>
				{2.1}K questions
			</span>
		</div>
	)
}
