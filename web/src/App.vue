<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useMessaging } from '@/composables/useMessaging'

import chatArea from './components/chatArea.vue'
import chatInput from './components/chatInput.vue'
import connection from './components/connection.vue'

const { connect, disconnect } = useMessaging()

onBeforeMount(() => {
  connect()
})
onBeforeUnmount(() => {
  disconnect()
})

</script>

<template>
<div class="flex flex-grow justify-center">
  <div class="w-1/2">
    <connection />
    <chatArea />
    <chatInput />
  </div>
</div>
</template>
