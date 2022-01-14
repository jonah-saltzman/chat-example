const { Server } = require('socket.io')
const Emitter = require('events')

class Room {
	#server
	socket
	constructor(server) {
		this.events = new Emitter()
		this.#server = new Server(server)
		this.#server.on('connection', (socket) => {
			this.events.emit('new-user', socket)
			console.log(socket.rooms)
			this.socket = socket
			socket.on('chat message', (msg) => {
				console.log('message: ', msg.message)
				socket.emit('chat message', msg.message)
			})
			socket.on('join', (req) => {
				console.log('hit join')
				this.events.emit('join', req, socket)
			})
		})
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

module.exports = Room