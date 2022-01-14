

class Socket {
    constructor(socket) {
        this.socket = socket
        this.userId = 'test123'
        this.#addListeners()
    }
    #addListeners() {
        this.socket.on('chat message', msg => {
            console.log('msg logged in class: ', msg)
            console.log('from socket: ', this.userId)
        })
    }
}

module.exports = Socket