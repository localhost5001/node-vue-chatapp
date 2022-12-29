import { ref, readonly } from 'vue'

import { useSocket } from '@/composables/useSocket'
import { ServerEvents } from '@/constants/eventNames'

const socket = useSocket()
const isConnected = ref(socket.connected ?? false)

socket.on(
    ServerEvents.CONNECT, 
    () => {
        isConnected.value = socket.connected
    }
)
socket.on(
    ServerEvents.DISCONNECT, 
    () => {
        isConnected.value = socket.connected
    }
)

export const useConnectionStatus = () => ({ isConnected: readonly(isConnected) })
