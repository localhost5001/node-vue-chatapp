import { computed } from 'vue'
import { useSocket } from '@/composables/useSocket'

import { useMessagesStore } from '@/store/messages'

import { ClientEvents, ServerEvents } from '@/constants/eventNames'

import type { MessageDto } from '@/models/messageDto'

const useMessaging = () => {    
    const socket = useSocket()
    const messagesStore = useMessagesStore()
    const messages = computed(() => messagesStore.messages)

    socket.on(ServerEvents.SERVER_MESSAGE, (msg: MessageDto) => {
        messagesStore.messages.push(msg)
    })

    const sendMessage = (message: string) => {
        socket.emit(ClientEvents.CLIENT_MESSAGE, message)
    }
    return { 
        sendMessage,
        messages
    }
}

export { useMessaging }
