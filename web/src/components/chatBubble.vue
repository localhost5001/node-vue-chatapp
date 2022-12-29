<script setup lang="ts">
import { computed } from 'vue'

export interface Props {
    start: boolean,
    msgText: string,
    color: 'primary' | 'secondary',
    userName: string,
    time: string,
}

const { color, msgText, start } = withDefaults(defineProps<Props>(), {
    color: 'secondary',
    msgText: '',
    start: true
})

const chatBubbleClass = computed(() => {
    return {
        'chat': true,
        'chat-start': start,
        'chat-end': !start,
    }
})
const chatMsgClass = computed(() => {
    return {
        'chat-bubble': true,
        [`chat-bubble-${color}`]: true
    }
})

</script>


<template>
<div :class="chatBubbleClass">
    <div class="chat-header">
        {{ userName }}
        <time class="text-xs opacity-50">{{ time }}</time>
    </div>
    <div :class="chatMsgClass">{{msgText}}</div>
</div>
</template>
