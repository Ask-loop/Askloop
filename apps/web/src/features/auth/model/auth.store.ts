import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/shared/types'

type AuthStore = {
	user: User | null
	setUser: (user: User) => void
	signOut: () => void
	isAuthenticated: boolean
}

export const useAuthStore = create<AuthStore>()(
	persist(
		set => ({
			user: null,
			isAuthenticated: false,
			setUser: user => set({ user, isAuthenticated: true }),
			signOut: () => set({ user: null, isAuthenticated: false })
		}),
		{
			name: 'auth',
			partialize: state => ({ user: state.user })
		}
	)
)
