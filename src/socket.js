

class UserSocket {
    constructor(socket) {
        this.socket = socket
        this.userId = 'test123'
        this.#addListeners()
        this.authenticated = false
    }
    #addListeners() {
        this.socket.on('chat message', msg => {
            console.log('msg logged in class: ', msg)
            console.log('from socket: ', this.userId)
        })
    }
    login(token) {
        // check token with jwt
        // if (valid) this.authenticated = true
    }
    authenti
}

module.exports = Socket