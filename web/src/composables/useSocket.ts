import { Socket, io } from 'socket.io-client'

let socket: Socket | null = null

export const useSocket = (): Socket => {
    if (!socket) {
        socket = io('http://localhost:8080')
    }

    return socket
}
