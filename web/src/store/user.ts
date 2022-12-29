import { defineStore } from 'pinia'

interface UserState {
    name: string | null
}

export const useUserStore = defineStore({
    id: 'user',
    state: (): UserState => ({
        name: null
    })
})
