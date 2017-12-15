import Utils from './../../shared/Utils'

import Phaser from 'phaser'

// import body from '../../assets/images/body.png'
// import head from '../../assets/images/head.png'

export default class extends Phaser.State {
	init () {}

	preload () {
		this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
		this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
		Utils.centerGameObjects([this.loaderBg, this.loaderBar])

		this.load.setPreloadSprite(this.loaderBar)
		// this.game.load.image('body', body)
		// this.game.load.image('head', head)
	}

	create () {
		this.state.start('Game')
	}
}