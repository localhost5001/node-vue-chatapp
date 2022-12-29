import moment from 'moment'
import type { Message } from './models/message'

export const createMessage = (userName: string, text: string): Message => {
    return {
        userName,
        text,
        time: moment().format('h:mm a')
    }
}
