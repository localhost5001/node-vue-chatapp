import { useSocket } from '@/composables/useSocket'
import { useRoomStore } from '@/store/room'

import { ClientEvents } from '@/constants/eventNames'

export const useRoom = () => {
  const socket = useSocket()
  const roomStore = useRoomStore()

  const joinRoom = (userName: string, roomName: string) => {
    const payload = { userName, roomName }
    socket.emit(ClientEvents.JOIN_ROOM, payload)
    roomStore.roomName = roomName
  }
  const leaveRoom = (userName: string) => {
    const payload = { userName, roomName: roomStore.roomName }
    socket.emit(ClientEvents.LEAVE_ROOM, payload)
    roomStore.roomName = null
  }

  return {
      joinRoom,
      leaveRoom,
  }
}
