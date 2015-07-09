// Overstate is a new state we are making and it is the screen the player will see when they either die
// or beat the level.
var overState = {
	create: function() {
		// We set the gameworld size back to the screen size.
		game.world.width = 800;
		game.world.height = 600;

		// We create a text object to display "You're Winner!" (intentional miss spelling, joke) if they win or
		// "Game Over" if they lose.
		var text = (game.global.score >= game.global.maxscore) ? "You're Winner!" : "Game Over";
		var winnerLabel = game.add.text(game.world.centerX, 200, text, {fontSize: 96, fill: '#ffffff'});
		winnerLabel.anchor.setTo(0.5, 0.5);

		// We creat the text object to allow them to replay the game! There is only one level in our game, multi-level
		// games might have an options menu to allow the player to choose a different level.
		var overLabel = game.add.text(game.world.centerX, game.world.centerY, 'Press Space to Play!', {fontSize: 96, fill: '#ffffff'});
        overLabel.anchor.setTo(0.5, 0.5);

        // Set a hotkey for the spacebar to play when it is pressed.
        this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spacekey.onDown.add(this.startGame, this);
	},

	// Start the game making sure to reset score and maxscore to 0. Understandably this will be changed again in
	// gameworld, but supersticious programmers are supersticious, better safe than sorry!
	startGame: function() {
		game.global.score = 0;
		game.global.maxscore = 0;
		game.state.start('play');
	},
};