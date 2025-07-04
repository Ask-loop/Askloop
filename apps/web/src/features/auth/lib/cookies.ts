'use server'

import { cookies } from 'next/headers'
import { Cookies } from '@/constants/cookies'

type Tokens = {
	accessToken: string
	refreshToken: string
}

export const setUserCookie = async (tokens: Tokens) => {
	const cookieStore = await cookies()

	cookieStore.set(Cookies.USER, JSON.stringify(tokens), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict'
	})
}

export const getUserCookie = async () => {
	const cookieStore = await cookies()

	const tokens = cookieStore.get(Cookies.USER)

	if (!tokens) return null

	return JSON.parse(tokens.value) as Tokens
}

export const clearCookie = async () => {
	const cookieStore = await cookies()

	cookieStore.delete(Cookies.USER)
}
