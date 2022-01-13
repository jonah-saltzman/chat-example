const { Server } = require('socket.io')

class Room {
    constructor(server, name) {
        this.name = name
        this.server = new Server(server)
        this.server.on('connection', (socket) => {
            console.log('user connected')
            this.socket = socket
            socket.on('chat message', (msg) => {
                console.log('message: ', msg)
            })
        })
    }
    static create(server, name) {
        const newServer = new this(server, name)
        console.log('created room')
    }
    #server
    #socket
}

module.exports = Room