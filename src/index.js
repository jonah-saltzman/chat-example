const express = require('express')
const http = require('http')
const Room = require('./room')

const app = express()
const server = http.createServer(app)

const SocketIO = require('./room')

const IoServ = SocketIO.create(server)

module.exports = IoServ

const rooms = []

app.get(
    '/newroom/:name',
    (req, res) => {
        console.log('creating room named: ', req.params.name)
        console.log(rooms)
        if (rooms.some(room => room === req.params.name)) {
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