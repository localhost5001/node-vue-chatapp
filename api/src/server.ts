import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

import { createMessage } from './utils'
import {  addUser, findUser, getRoomUsers, userLeave} from './repositories/usersRepository'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*', methods: '*' }, } )

app.use(cors())

io.on('connection', (socket) => {    
    const sendMessage = (userName: string, roomId: string, text: string) => {
        socket.emit('serverMessage', createMessage(userName, text))
    }
    const broadCastMessage = (text: string, roomId: string) => {
        socket.broadcast
            .to(roomId)
            .emit('serverMessage', createMessage('Chat Bot', text))
    }

    socket.on('joinRoom', ({userName, roomName}) => {
        socket.join(roomName)
        addUser(socket.id, roomName, userName)
        broadCastMessage(`User ${userName } has joined ${roomName}`, roomName)
    })
    socket.on('leaveRoom', ({userName, roomName}) => {
        socket.leave(roomName)
        userLeave(socket.id)
        console.log(`User ${userName } has left ${roomName}`)
        broadCastMessage(`User ${userName } has left ${roomName}`, roomName)
    })

    socket.on('disconnect', () => {
        const user = userLeave(socket.id)
        if (user) {
            io
                .to(user.roomId)
                .emit('serverMessage', createMessage('Chat Bot', `${user.name} has left the chat`))
        }
    })

    socket.on('clientMessage', (msg) => {
        const user = findUser(socket.id)
        if (!user) {
            return
        }

        io.to(user.roomId).emit('serverMessage', createMessage(user.name, msg))
    }) 
})

app.get("/", (req, res) => {
    res.send('Hello World')
})

server.listen(8080, () => {
    console.log('Server is running on port 8080')
})
