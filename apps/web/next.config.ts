import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		dirs: ['src']
	},
	swcMinify: true,
	serverRuntimeConfig: {
		host: 'localhost',
		port: 3000
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com'
			}
		]
	}
}

export default nextConfig
