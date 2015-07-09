var loadState = {
	preload: function() {
		// Progress Bar
		var progressBar = game.add.sprite(game.world.centerX, game.world.centerY, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.spritesheet('player', 'assets/olaf.png', 34, 34);
        game.load.spritesheet('coin', 'assets/coin.png', 32, 32);
        game.load.spritesheet('spike', 'assets/spike.png', 16, 16);

        game.load.image('ruins', 'assets/ruins.png');
        game.load.tilemap('ruins', 'assets/ruins.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.json('ruins', 'assets/ruins.json');

        game.load.image('empty-heart', 'assets/empty_heart.png');
        game.load.image('heart', 'assets/heart.png');
	},
	create: function() {
		game.state.start('menu');
	},
};