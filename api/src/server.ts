import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import moment from 'moment'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*', methods: '*' }, } )

app.use(cors())

interface Message {
    userName: string
    text: string
    time: string
}

const createMessage = (userName: string, text: string): Message => {
    return {
        userName,
        text,
        time: moment().format('h:mm a')
    }
}

io.on('connection', (socket) => {    
    const sendMessage = (userName: string, roomId: string, text: string) => {
        socket.emit('serverMessage', createMessage(userName, text))
    }
    const broadCastMessage = (text: string, roomId: string) => {
        socket.broadcast
            .to(roomId)
            .emit('serverMessage', createMessage('Chat Bot', text))
    }

    socket.on('joinRoom', ({userName, roomId}) => {
        socket.join(roomId) 
        broadCastMessage(`User ${userName } has joined the chat`, roomId)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('clientMessage', (msg) => {
        socket.emit('serverMessage', msg)
    }) 
})

app.get("/", (req, res) => {
    res.send('Hello World')
})

server.listen(8080, () => {
    console.log('Server is running on port 8080')
})
