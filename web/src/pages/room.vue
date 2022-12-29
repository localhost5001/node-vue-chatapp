<script setup lang="ts">
import { useRouter } from 'vue-router'
import ChatArea from '@/components/chatArea.vue'

import { useRoom } from '@/composables/useRoom'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const { leaveRoom } = useRoom()

const onLeaveRoomClick = () => {
  if (!userStore.name) {
    throw new Error('User name is not set')
  }

  leaveRoom(userStore.name)
  router.push('/')
}

</script>

<template>
    <div class="flex flex-col">
      <div class="flex">
        <button 
          @click="onLeaveRoomClick"
          class="btn btn-error"
        >
          Leave room
        </button>
      </div>

      <div>
        <ChatArea />
      </div>
    </div>
</template>
