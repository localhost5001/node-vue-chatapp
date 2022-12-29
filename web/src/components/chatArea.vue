<script setup lang="ts">
import { computed } from 'vue'

import { useMessaging } from '@/composables/useMessaging'
import { useUserStore } from '@/store/user'

import chatBubble, { Props } from '@/components/chatBubble.vue'

const { messages } = useMessaging()
const userStore = useUserStore()

const msgs = computed<Props[]>(() => messages.value.map((msg) => {
    const isUsersMessage = userStore.name === msg.userName
    return {
        start: !isUsersMessage,
        msgText: msg.text,
        color: isUsersMessage ? 'primary' : 'secondary',
        userName: msg.userName,
        time: msg.time
    }
}))
</script>

<template>
<div class="p-5">
    <chatBubble 
        v-for="msg in msgs" 
        :start="msg.start" 
        :msgText="msg.msgText" 
        :color="msg.color"
        :userName="msg.userName"
        :time="msg.time"
    />
</div>
</template>
