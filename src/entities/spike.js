Spike = function(game, x, y) {
	Entity.call(this, game, x, y, 'spike');
	this.create();
};

Spike.prototype = Object.create(Entity.prototype);
Spike.prototype.constructor = Spike;

Spike.prototype.create = function() {
	// Call the parent, yes this is how you do it
	Entity.prototype.create.call(this);

	// We don't want spikes to be solid
	this.body.checkCollision.up = false;
	this.body.checkCollision.right = false;
	this.body.checkCollision.left = false;
	this.body.checkCollision.down = false;

	// Animations
	this.animations.add('idle', [0], 1, false);
	this.animations.play('idle');

	// Bounding Box
	// The spikes bounding box is really thin because want to make it seem like the point
	// is what is damaging the player, not the entire sprite itself.
	this.body.setSize(2, 16);
};

// Right now the spike is only hurting the player but its good practice to check and make
// sure that it is the Player object and not something else. If it is the player object we
// simply call the damage function on it and bam! We have a hazard!
Spike.prototype.checkOverlap = function(object) {
	if (object instanceof Player) {
		object.damage(1);
	}
};