Coin = function(game, x, y) {
	Entity.call(this, game, x, y, 'coin');
	this.create();
};

Coin.prototype = Object.create(Entity.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.create = function() {
	// Call the parent, yes this is how you do it
	this.scale = {x: 0.5, y: 0.5};
	Entity.prototype.create.call(this);

	// We don't want coins to collide
	this.body.checkCollision.up = false;
	this.body.checkCollision.right = false;
	this.body.checkCollision.left = false;
	this.body.checkCollision.down = false;

	// Animations
	this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 5, true);
	this.animations.play('idle');
};

Coin.prototype.update = function() {

};

Coin.prototype.checkOverlap = function(object) {
	game.global.score += 10;
	this.kill();
};