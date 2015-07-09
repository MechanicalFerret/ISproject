// UI isn't a single object that appears on the screen, it simply is a container for multiple objects
// that could appear on the screen. (Usually text, indicators, and the like). UI will always stay on
// the screen even when the player moves and will not be interactable to the player.

UI = function() {
	this.create();
};

UI.prototype = {
	// We have a group that contains all the objects UI holds. In this project its mostly a formality
	// since all we have to show is score, but in a more complex project the UI will be made up of multiple
	// objects so its easy to keep things in a group.
	group: null,

	create: function() {
		// We add the group to the game and then tell Phaser we want it fixed to the camera. This will make
		// it so all objects in this group appear relative to the camera, NOT the game world. This is an
		// important distinction as now we have 2 coordinate planes to think of: The game world and the
		// screen space
		this.group = game.add.group();
		this.group.fixedToCamera = true;

		// We are going to add some hearts to keep track of Olaf's health when he gets hurt. This can be easily
		// done by creating some image objects and removing / adding them.
		this.emptyhearts = game.add.tileSprite(0, 0, 96, 27, 'empty-heart');
		this.hearts = game.add.tileSprite(0, 0, 96, 27, 'heart');
		this.group.add(this.emptyhearts);
		this.group.add(this.hearts);

		// We will create a text object that will appear in the upper left corner of the screen to keep track
		// of our score then add it to the group. Nothing too complicated here
		this.score = game.add.text(0, 30, "Score: ", {font: "12px Arial", fill: '#ffffff'});
		this.group.add(this.score);
	},

	update: function() {
		// When we update we want to check our current score and change the text as needed. You could also have
		// it so when coins are collected the Score adjusts, but for now this works because we are not sure going
		// ahead if there will be more things that adjust score.
		this.score.text = "Score: " + game.global.score + " / " + game.global.maxscore;

		// We also want to check the player's current health. A reference to the gameworld object is necessary now
		// to add to the games Global variables list. Since we have a tiled sprite we can simply add and remove hearts
		// by increasing or decreasing the width of it. The width of a single heart is 32 pixels
		this.hearts.width = game.global.gameworld.player.health * 32;
	},
};