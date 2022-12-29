import type { User } from '../models/user'

const users: User[] = []

export const addUser = (socketId: string, roomId: string, userName: string): boolean => {
    const userConnected = findUser(socketId)
    if (userConnected) {
        return false
    }

    const user: User = { id: socketId, name: userName, roomId }
    users.push(user)

    return true
}

export const findUser = (socketId: string) => users.find(user => user.id === socketId)

export const userLeave = (socketId: string): User | undefined => {
    const index = users.findIndex(user => user.id === socketId)
  
    if (index !== -1) {
      return users.splice(index, 1)[0]
    }

    return undefined
}

export const getRoomUsers = (roomId: string) => {
    return users.filter(user => user.roomId === roomId)
}
