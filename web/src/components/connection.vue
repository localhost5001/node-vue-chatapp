<script setup lang="ts">
import { ref } from 'vue'
import { useMessaging } from '@/composables/useMessaging'

const { joinRoom } = useMessaging()
const userName = ref('')
const selectedRoom = ref('')

const onJoinClick = () => {
    if (!userName.value) {
        window.alert('Please enter a user name')
        return
    }
    if (!selectedRoom.value) {
        window.alert('Please select a room')
        return
    }
    joinRoom(userName.value, selectedRoom.value)
}
</script>

<template>
    <div class="flex justify-center">
        <div>
            <input 
                v-model="userName" type="text" placeholder="Enter user name..." class="input input-bordered grow" 
            />
            <select v-model="selectedRoom" class="select select-primary w-full max-w-xs">
                <option disabled value="">Please select one</option>
                <option>Zaza</option>
                <option>Living Room</option>
            </select>

            <button 
                :disabled="!userName || !selectedRoom" 
                @click="onJoinClick" 
                class="btn btn-outline m-2"
            >
                Join room
            </button>
        </div>
    </div>
</template>
