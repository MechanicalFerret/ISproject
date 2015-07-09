Entity = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, key);
	game.add.existing(this);
};

Entity.prototype = Object.create(Phaser.Sprite.prototype);
Entity.prototype.constructor = Entity;

Entity.prototype.create = function() {
	// The current health of the Entity, if health is less than or equal to 0 the entity
	// will be removed.
	this.health = 1;
	this.max_health = 1;

	// A boolean variable used to determine of the Entity can take damage or not
	this.immune = false;

	// Locks the entity into an animation until the clearLock function is called, useful for
	// animations you want to play until they complete.
	this.lockAnim = "";

	// Setup
	game.physics.arcade.enable(this);
	this.anchor.setTo(0.5, 0.5);
	this.fixPositionAnchor();
};

// A function called by our collision system when two objects collide. The passed object is the
// object that this entity is colliding with.
Entity.prototype.checkCollide = function(object) {

};

// A function called by our collision system when two objects overlap. The passed object is the
// object that the entity is overlapping.
Entity.prototype.checkOverlap = function(object) {

};

Entity.prototype.clearLock = function() {
	this.lockAnim = "";
};

Entity.prototype.setHealth = function(current, max) {
	this.health = current;
	this.max_health = max;
};

Entity.prototype.heal = function(amount) {
	this.health += amount;
	if(this.health > this.max_health) {this.health = this.max_health};
};

Entity.prototype.damage = function(amount) {
	if (this.immune == true) { return; }
	this.health -= amount;
	if (this.health <=0) { this.kill(); }
};

Entity.prototype.fixPositionAnchor = function() {
	this.x = this.x + (this.width / 2);
	this.y = this.y + (this.height / 2);
};

// The check ground function is a simple way to find out if a body is touching the ground, that ground
// either being an object or a tile. There are slight differences to these two values
// ---> blocked checks if the sprites body is colliding with a Tile (from our level) or the world bounds
// ---> touching checks if the sprites body is colliding with another Sprite body (such as a moving platform)
// Both can be useful in their own way but often times its easier to check both which is why we have this function.
Entity.prototype.checkGround = function() {
	if(this.body.blocked.down) return true;
	if(this.body.touching.down) return true;
	return false
};