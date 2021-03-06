import Draw from './../utils/Draw'
import Utils from './../../shared/Utils'
import Events from './../../shared/Events'

import Phaser from 'phaser'
import io from 'socket.io-client'

import User from '../objects/User'

export default class extends Phaser.State {

	init () {
		this.users;
		this.gameUID;
	}
 
	preload () {
		console.log('preload game')
	}

	create () {
		// create new browser session and UUID if none exists
		this.gameUID = (!localStorage.getItem('gameUID')) ? Utils.generateUID() : localStorage.getItem('gameUID');
		localStorage.setItem('gameUID', this.gameUID)

		this.background = Draw.randomBackground(game, this.game.width, this.game.height, 100);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.world.setBounds(0, 0, this.game.width, this.game.height);
		this.users = [];

		this.socket = io('http://' + window.location.hostname + ':8000');

		// this.game.camera.follow(this.user.head);
	
		this.socket.on(Events.CLIENT_CONNECT, e => this._onClientConnect(e))

		this.socket.on(Events.NEW_CLIENT_USER, e => this._onNewClientUser(e))

		this.socket.on(Events.NEW_USER, e => this._onNewUser(e))

		this.socket.on(Events.MOVE_USER, e => this._onMoveUser(e))

		this.socket.on(Events.REMOVE_USER, e => this._onRemoveUser(e))

		this.socket.on(Events.CLIENT_DISCONNECT, e => this._onClientDisconnect(e))
	}

	update () {
		if (this.user) this.user.update(true);

		for (var i = 0; i < this.users.length; i++) {
			if (this.users[i].alive) {
				this.users[i].update()
				this.game.physics.arcade.collide(user, this.users[i].user, this._handleUserColision)
			}
		}
	}

	render () {
		/*if (__DEV__) {
			this.game.debug.spriteInfo(this.user.head, 32, 32)
		}*/
	}

	_onClientConnect () {
		console.log('_onClientConnect')

		// generate new user (in case one doesn't already exist)
		let userData = {
			id: this.gameUID,
			x: this.game.world.centerX,
			y: this.game.world.centerY,
			color: Utils.randomHex()
		}
		
		this.socket.emit(Events.REGISTER_SESSION, userData)
	}

	_onNewClientUser(data) {

		let duplicate = this.users.find(function(user){
			return user.id == data.id;
		})
		if (duplicate) return
		
		this.user = new User({ ...data, game: this.game, socket: this.socket })
		this.users.push(this.user)

		this.socket.emit(Events.NEW_USER, data)
	}

	_onNewUser (data) {

		let duplicate = this.users.find(function(user){
			return user.id == data.id;
		})
		if (duplicate) return

		this.users.push(new User({
			id: data.id,
			x: data.x,
			y: data.y,
			color: data.color,
			game: this.game,
			socket: this.socket
		}))
	}

	_onMoveUser (data) {
		// console.log('_onMoveUser', data) + '\n';

		let user = this.users.find(function(user){
			return user.id == data.id;
		})

		if (!user) {
			console.log('user not found: ', data.id)
			return
		}

		user.moveUser(data.x, data.y)
	}

	_onRemoveUser (data) {
		console.log('_onRemoveUser', data);
		
		let user = this.users.find(function(user){
			return user.id == data.id;
		})
	
		if (!user) {
			console.log('user not found: ', data.id)
			return
		}
		
		this.users.splice(this.users.indexOf(user), 1)
	}

	_handleUserColision (me, them) {
		console.log('_handleUserColision', me, them)
	}

	_onClientDisconnect (data) {
		let user = this.users.find(function(user){
			return user.id == data.id;
		})
		this.users.splice(this.users.indexOf(user), 1)

		// user.disconnected = true;
		// setTimeout(function () {
		// 		if (user.disconnected) user.delete();
		// }, 1000);
	}
}