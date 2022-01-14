const { Server } = require('socket.io')
const Emitter = require('events')
const Socket = require('./socket')

class IoServer {
	#server
	socket
	constructor(server) {
		this.events = new Emitter()
		this.#server = new Server(server)
		this.#server.on('connection', (socket) => {
            console.log('new connection')
            const newSocket = new Socket(socket)
            console.log('created socket instance with id: ', newSocket.userId)
			this.events.emit('new-connection', newSocket)
			socket.on('chat message', (msg) => {
				console.log('message: ', msg.message)
				socket.emit('chat message', msg.message)
			})
			socket.on('join', (req) => {
				console.log('hit join')
				this.events.emit('join', req, socket)
			})
		})
        this.events.emit('server-created')
	}
	static create(server) {
		const newServer = new this(server)
		console.log('serv obj created')
		return newServer
	}
	async addMember() {
		console.log('request to join: ', this.name)
		const joined = await this.socket.join(this.id)
		console.log(joined)
		return
	}
	addListener(string, fn) {
		console.log('adding listener')
		this.#server.on(string, fn)
	}
	send(msg, to) {
		console.log('sending message ', msg, ' to ', to)
		this.#server.to(to).emit('chat message', msg)
	}
}

module.exports = IoServer