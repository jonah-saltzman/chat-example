const express = require('express')
const http = require('http')
const Room = require('./room')

const app = express()
const server = http.createServer(app)

module.exports = server

const IoServ = Room.create(server)

IoServ.events.on('new-user', (socket) => {
    console.log('user joined')
    console.log(socket.rooms)
})

IoServ.events.on('join', (req) => {
    console.log('request to join')
    console.log(req)
})

// IoServ.events.
// IoServ.addListener('new-user', (socket) => {
// 	console.log('new user!')
// 	console.log(socket)
// 	socket.join(rooms[0])
// })


const rooms = []

app.get(
    '/newroom/:name',
    (req, res) => {
        console.log('creating room named: ', req.params.name)
        if (rooms.some(room => room.name === req.params.name)) {
            console.log('room already exists')
            res.status(400).json({error: 'Room already exists'})
            return
        }
        rooms.push(req.params.name)
        res.sendFile(__dirname + '/html/index.html')
    }
)

app.get(
    '/join/:name',
    (req, res) => {
        const room = rooms.find(room => room.name = req.params.name)
        res.sendFile(__dirname + '/html/index.html')
    }
)

server.listen(3040, () => {
    console.log('listening on port 3040')
})