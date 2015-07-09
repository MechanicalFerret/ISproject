Player = function(game, x, y) {
	Entity.call(this, game, x, y, 'player');
	this.create();
};

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;

Player.prototype.create = function() {
	// Call the parent, yes this is how you do it
	Entity.prototype.create.call(this);

	// Setup
	this.body.gravity.y = 300;
	this.body.setSize(32, 32);
	
	// Input
	this.cursors = game.input.keyboard.createCursorKeys();
	this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	this.spacebar.onDown.add(Player.prototype.jump, this);

	// Animations
	this.animations.add('idle', [0], 1, false);
	this.animations.add('idle-tiny', [104], 0, false);
	this.animations.add('idle-shield', [16], 1, false);
	this.animations.add('walk', [8, 9, 10, 11, 12, 13, 14, 15], 7, true);
	this.animations.add('walk-tiny', [112, 113, 114, 115], 7, true);
	this.animations.add('walk-shield', [24, 25, 26, 27, 28, 29, 30, 31], 7, true);
	this.animations.add('fall', [64, 65], 3, true);
	this.animations.add('fall-shield', [56, 57], 3, true);
	this.animations.add('shrink', [96, 97, 98], 7, false);
	this.animations.add('grow', [98, 97, 96], 7, false);
	this.animations.add('hit', [184, 185, 178], 5, false);
	this.animations.add('push', [128, 129, 130, 131], 3, true);	
	this.animations.getAnimation('shrink').onComplete.add(this.clearLock, this);
	this.animations.getAnimation('grow').onComplete.add(this.clearLock, this);
	this.animations.getAnimation('hit').onComplete.add(this.clearLock, this);

	// Player Variables
	this.tiny = false; 			
	this.olafShield = false;
	this.setHealth(3, 3);
	this.immuneTimer = null;
};

Player.prototype.update = function() {
	this.checkBounds();
	this.checkInput();
	this.checkAnim();
};

Player.prototype.checkAnim = function() {
	if(this.lockAnim != "") {this.animations.play(this.lockAnim); return;}

	var animation = "";
	var blocked = (this.body.blocked.right || this.body.blocked.left);

	// Low Priority Animations
	if(this.body.velocity.x ==0) animation = (this.tiny) ? "idle-tiny" : (this.olafShield) ? "idle-shield" : "idle";
	else animation = (blocked) ? "push" : (this.tiny) ? "walk-tiny" : (this.olafShield) ? "walk-shield" : "walk";

	// Medium Priority Animations
	if(!this.checkGround()) animation = (this.olafShield) ? "fall-shield" : "fall";

	// And Play the Animation
	this.animations.play(animation);
};

Player.prototype.checkInput = function() {
	this.body.velocity.x = 0;

	// Horizantal
	if(this.cursors.left.isDown && !this.cursors.right.isDown) {
		this.scale.x = -1;
		this.body.velocity.x = -150;
	}
	else if(!this.cursors.left.isDown && this.cursors.right.isDown) {
		this.scale.x = 1;
		this.body.velocity.x = 150;
	}

	// Jumping
	if(!game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && !this.checkGround() && this.body.velocity.y < -100) {
		this.body.velocity.y = -100;
	}

	// Floating
	if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.body.velocity.y >= 0) {
		if(this.body.velocity.y > 50) this.body.velocity.y = 50;
		this.olafShield = true;
	}
	else {
		this.olafShield = false;
	}

	// Shrinking
	if(this.cursors.down.isDown && this.checkGround() && this.tiny == false) {
		this.tiny = true;
		this.lockAnim = "shrink";
		this.body.setSize(32, 16, 0, 8);
	}
	if(this.cursors.up.isDown && this.checkGround() && this.tiny == true) {
		this.tiny = false;
		this.lockAnim = "grow";
		this.body.setSize(32, 32, 0 , 0);
	}
	if(!this.checkGround() && this.tiny == true) {
		this.tiny = false;
		this.lockAnim = "grow";
		this.body.setSize(32, 32, 0, 0);
	}
};

// An annoying thing that olaf does is jump when the button is held even after he has just landed
// To fix this we created a hotkey for the spacebar above which will instead have Olaf only jump when
// he is on the ground and the key is pressed.
// Note: We reduced Olaf's jumping height some to make the game a bit more challenging
Player.prototype.jump = function() {
	if(this.checkGround()) {
		this.body.velocity.y = -200;
	}
};

// We are going to kill Olaf if he falls too far below the game world, to do that we check his position
// against the game world vertical boundries.
Player.prototype.checkBounds = function() {
	if (this.position.y > game.world.height) {
		this.kill();
	}
};

// We override Olaf's damage function because we want him to take damage then become immune to damage
// for 3 seconds. If we didn't do this then a single attack would drain away his health and there would]
// be no recovery time.
Player.prototype.damage = function(amount) {
	Entity.prototype.damage.call(this, amount);

	if (this.immune == false) {
		this.immune = true;
		this.immuneTimer = game.time.events.add(3000, Player.prototype.unimmune, this);
		this.alpha = 0.5;
		this.lockAnim = "hit";
	}
};

// A function called when the immuneTimer runs out, we simply set the immunity boolean to false and also
// set his alpha back to normal to denote to the player they can take damage again.
Player.prototype.unimmune = function() {
	this.immune = false;
	this.alpha = 1;
};