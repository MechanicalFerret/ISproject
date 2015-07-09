// Sprite is just a static namespace of generally useful functions relating to sprites.
Sprite = {};

Sprite.fixPositionAnchor = function(sprite) {
	sprite.x = sprite.x + (sprite.width / 2);
	sprite.y = sprite.y + (sprite.height / 2);
}

// This function will check all three conditions of being on the ground (since for some reason Phaser does this, no idea why) and returns
// true or false. The sprite has to have body enabled for this to work.
Sprite.checkGround = function(sprite) {
	if(sprite.body.onFloor()) return true;
	if(sprite.body.blocked.down) return true;
	if(sprite.body.touching.down) return true;
	return false
}