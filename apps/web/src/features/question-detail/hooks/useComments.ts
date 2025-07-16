import { useState } from 'react'
import { mockComments } from '../model/comments.mock'
import { Comment } from '../model/types'

export const useComments = (parentId: number) => {
	const [comments, setComments] = useState<Comment[]>(
		mockComments.filter(
			c => c.parentId === parentId || (!c.parentId && parentId === 0)
		)
	)
	const [loading, setLoading] = useState(false)

	const addComment = (content: string) => {
		setLoading(true)
		setTimeout(() => {
			setComments(prev => [
				...prev,
				{
					id: Date.now(),
					content,
					author: {
						id: 1,
						displayName: 'You',
						picture: undefined
					},
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
					parentId
				}
			])
			setLoading(false)
		}, 500)
	}

	return { comments, addComment, loading }
}
