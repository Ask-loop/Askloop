'use server'

import { cookies } from 'next/headers'
import { Cookies } from '@/constants/cookies'
import { Tokens } from '../../model/types'

export const setAuthCookie = async (tokens: Tokens) => {
	const cookieStore = await cookies()

	cookieStore.set(Cookies.USER, JSON.stringify(tokens), {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'strict'
	})
}
