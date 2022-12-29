<script setup lang="ts">
import { computed } from 'vue'
import chatBubble, { Props } from '@/components/chatBubble.vue'
import { messagesState } from '@/composables/useMessaging'

const { messages: messageTexts, userName } = messagesState()

const msgs = computed<Props[]>(() => messageTexts.value.map((msg) => {
    const isUsersMessage = userName.value === msg.userName
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
