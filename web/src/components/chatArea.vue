<script setup lang="ts">
import { computed } from 'vue'
import chatBubble, { Props } from '@/components/chatBubble.vue'
import { messagesState } from '@/composables/useMessaging'

const { messages: messageTexts } = messagesState()

const msgs = computed<Props[]>(() => messageTexts.value.map((msg) => {
    return {
        start: true,
        msgText: msg.text,
        color: 'primary',
    }
}))
</script>

<template>
<div class="p-5">
    <chatBubble v-for="msg in msgs" :start="msg.start" :msgText="msg.msgText" :color="msg.color" />
</div>
</template>
