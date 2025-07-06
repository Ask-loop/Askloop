'use server'

import { cookies } from 'next/headers'
import { Tokens } from '../../types'
import { Cookies } from '@/constants/cookies'

export const getAuthCookie = async () => {
	const cookieStore = await cookies()

	const tokens = cookieStore.get(Cookies.USER)

	if (!tokens) return null

	return JSON.parse(tokens.value) as Tokens
}

export const clearAuthCookie = async () => {
	const cookieStore = await cookies()

	cookieStore.delete(Cookies.USER)
}
