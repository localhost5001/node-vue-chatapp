import { io, Socket } from 'socket.io-client'
import { createGlobalState } from '@vueuse/core'
import { ref, readonly } from 'vue'

import type { MessageDto } from '@/models/messageDto'
import type { Message } from '@/models/message'

let socket: Socket | null = null

const messagesState = createGlobalState(() => {
    const messages = ref<Message[]>([])
    const userName = ref<string | null>(null)
    const roomId = ref<string | null>(null)

    const addMessage = (message: MessageDto) => {
        messages.value.push(message)
    }
    const addMessages = (newMessages: MessageDto[]) => {
        messages.value.push(...newMessages)
    }
    const clearMessages = () => {
        messages.value = []
    }

    const setUsername = (name: string) => {
        userName.value = name
    }
    const clearUsername = () => {
        userName.value = null
    }

    const setRoomId = (id: string) => {
        roomId.value = id
    }
    const clearRoomId = () => {
        roomId.value = null
    }

    return {
        messages: readonly(messages),
        userName: readonly(userName),
        roomId: readonly(roomId),
        addMessage,
        addMessages,
        clearMessages,
        setUsername,
        clearUsername,
        setRoomId,
        clearRoomId,
    }
})

const useMessaging = () => {
    const { 
        addMessage,
        clearUsername, 
        setUsername,
        setRoomId,
        clearRoomId
    } = 
        messagesState()
    const isConnected = ref(socket?.connected ?? false)

    const connect = () => {
        socket = io('http://localhost:8080')

        socket.on('connect', () => {
            isConnected.value = true
        })
        socket.on('serverMessage', (msg: MessageDto) => {
            addMessage(msg)
        })
    }
    const disconnect = () => {
        if (socket) {
            socket.disconnect()
            socket = null
            isConnected.value = false
        }
    }
    const sendMessage = (message: string) => {
        if (socket) {
            socket.emit('clientMessage', message)
        }
    }
    const joinRoom = (userName: string, roomId: string) => {
        if (socket) {
            socket.emit('joinRoom', { userName, roomId })
            setUsername(userName)
            setRoomId(roomId)
        }
    }

    return { 
        connect,
        disconnect,
        sendMessage,
        joinRoom,
        isConnected: readonly(isConnected)
    }
}

export { messagesState, useMessaging }
