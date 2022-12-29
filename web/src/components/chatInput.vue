<script setup lang="ts">
import { ref } from 'vue'
import { useMessaging } from '@/composables/useMessaging'

const { sendMessage } = useMessaging()
const messageText = ref('')

const onSendBtnClick = () => {
    if (!messageText.value) {
        return
    }

    sendMessage(messageText.value)
    
    messageText.value = ''
}

</script>

<template>
    <div class="flex flex-grow p-5">
        <input v-model="messageText" type="text" placeholder="Type here" class="input input-bordered grow" />
        <button @click="onSendBtnClick" class="btn btn-primary ml-2">Send</button>
    </div>
</template>
