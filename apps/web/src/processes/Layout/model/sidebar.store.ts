import { create } from 'zustand'

type SidebarStore = {
	collapsed: boolean
	setCollapsed: (collapsed: boolean) => void
	toggle: () => void
}

export const useSidebarStore = create<SidebarStore>(set => ({
	collapsed: false,
	setCollapsed: collapsed => set({ collapsed }),
	toggle: () => set(state => ({ collapsed: !state.collapsed }))
}))
