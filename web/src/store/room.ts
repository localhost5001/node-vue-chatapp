import { defineStore } from 'pinia'

interface RoomState {
  roomName: string | null
}

export const useRoomStore = defineStore({
  id: 'room',
  state: (): RoomState => ({
    roomName: null,
  })
})
