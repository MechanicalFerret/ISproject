var menuState = {
	create: function() {
		game.stage.backgroundColor = '#787878';
		var startLabel = game.add.text(game.world.centerX, game.world.centerY, 'Press Space to Play!', {
            fontSize: 96,
            fill: '#ffffff'
        });
        startLabel.anchor.setTo(0.5, 0.5);
        this.spacekey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spacekey.onDown.add(this.startGame, this);
	},
	startGame: function() {
		game.state.start('play');
	},
};