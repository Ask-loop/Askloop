import { Comment } from './types'

export const mockComments: Comment[] = [
	{
		id: 1,
		content: 'This is a helpful question! Thanks for posting.',
		author: {
			id: 2,
			displayName: 'Alice',
			picture: undefined
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		parentId: undefined
	},
	{
		id: 2,
		content: 'Can you clarify your use case?',
		author: {
			id: 3,
			displayName: 'Bob',
			picture: undefined
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		parentId: undefined
	},
	// Example for an answer comment
	{
		id: 3,
		content: 'Nice answer!',
		author: {
			id: 4,
			displayName: 'Charlie',
			picture: undefined
		},
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		parentId: 10 // Suppose this is for answer with id 10
	}
]
