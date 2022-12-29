<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/store/user'

import { useRoom } from '@/composables/useRoom'

const { joinRoom } = useRoom()
const router = useRouter()

const userStore = useUserStore()
const roomName = ref<string | null>(null)

const onEnterClick = () => {
  if (!userStore.name || !roomName.value) {
    window.alert('Please enter a user name and choose a room')
    return
  }

  joinRoom(userStore.name, roomName.value)
  router.push('/room')
}

const rooms = [
  'Zaza',
  'Living Room',
  'Bedroom'
]

</script>

<template>
<div class="flex flex-col w-2/3 items-center">
  <input 
    v-model.trim="userStore.name"
    type="text"
    placeholder="Enter user name" 
    class="input w-full max-w-xs m-1" 
  />

  <select v-model="roomName" class="select w-full max-w-xs">
      <option disabled value="">Please select one</option>
      <option v-for="room in rooms" :key="room">{{ room }}</option>
  </select>

  <button 
    :disabled="!userStore.name || !roomName"
    @click="onEnterClick"
    class="btn m-1"
  >
    Enter room
  </button>
</div>
</template>
