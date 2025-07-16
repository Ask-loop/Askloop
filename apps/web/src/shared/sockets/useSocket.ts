import { useEffect, useRef, useState } from 'react'
import { socket } from './socket'

export const useSocket = () => {
	const [isConnected, setIsConnected] = useState(socket.connected)
	const socketRef = useRef(socket)

	useEffect(() => {
		socketRef.current.on('connect', () => {
			console.log('connected')
			setIsConnected(true)
		})

		socketRef.current.on('disconnect', () => {
			setIsConnected(false)
		})

		socketRef.current.on('error', error => {
			console.error(error)
		})

		return () => {
			socketRef.current.off('connect')
			socketRef.current.off('disconnect')
			socketRef.current.off('error')
		}
	}, [])

	return { socket: socketRef.current, isConnected }
}
