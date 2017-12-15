var User = function (_id, _x, _y, _color) {
	var id = _id
	var x = _x
	var y = _y
	var color = _color

	var getX = function() {
		return x
	}

	var setX = function(newX) {
		x = newX
	}

	var getY = function() {
		return y
	}

	var setY = function(newY) {
		y = newY
	}

	var getColor = function() {
		return color
	}

	var setColor = function(newColor) {
		color = newColor
	}

	return {
		id: id,
		getX: getX,
		setX: setX,
		getY: getY,
		setY: setY,
		getColor: getColor,
		setColor: setColor
	}
}

module.exports = User