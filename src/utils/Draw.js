module.exports = {

	circle: (game, radius, fillColor, lineColor) => {
		
		var graphics = game.add.graphics(0, 0);
		graphics.beginFill(fillColor, 0.5);
		graphics.lineStyle(1, lineColor, 1);
		graphics.drawCircle(radius*0.5, radius*0.5, radius);

		return graphics;
	},

	randomBackground(game, w, h) {

		var graphics = game.add.graphics(0, 0);
		graphics.lineStyle(1, 0xFFFFFF, 1);

		for (var i = 0; i < 300; i++) {
			graphics.drawCircle(Math.random()*w, Math.random()*h, 1);
		}

		return graphics;
	},

	randomHex() {
		return '0x' + Math.floor(Math.random()*16777215).toString(16);
	}
}