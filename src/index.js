const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const http = require('http')
const Room = require('./room')

const app = express()
const server = http.createServer(app)

module.exports = server

app.get(
    '/newroom/:name',
    (req, res) => {
            console.log('creating room named: ', req.params.name)
            Room.create(server, req.params.name)
            res.sendFile(__dirname + '/html/index.html')
        }
    )

server.listen(3040, () => {
    console.log('listening on port 3040')
})