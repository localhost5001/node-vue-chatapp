import { defineStore } from 'pinia'
import { Message } from '@/models/message'

interface MessagesState {
    messages: Message[]
}

export const useMessagesStore = defineStore({
    id: 'messages',
    state: (): MessagesState => ({
        messages: [],
    })
})
