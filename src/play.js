var playState = {
	create: function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Load in the Level
		game.stage.backgroundColor = '#787878';
		this.gameworld = new Gameworld(this);
		this.gameworld.loadLevel('ruins');
		game.global.gameworld = this.gameworld;

		// Setup Camera
		game.camera.follow(this.gameworld.player, Phaser.Camera.FOLLOW_PLATFORMER);

		// Setup UI
		this.ui = new UI();
	},

	update: function() {
		game.physics.arcade.collide(this.gameworld.objects, this.gameworld.layers.playable);
		game.physics.arcade.overlap(this.gameworld.player, this.gameworld.coins, this.checkOverlap, null, this);
		game.physics.arcade.overlap(this.gameworld.player, this.gameworld.enemies, this.checkOverlap, null, this);

		// Update the UI
		this.ui.update();

		// Check if we are done
		if (game.global.score >= game.global.maxscore) {
			game.state.start('over');
		}
		if (!this.gameworld.player.alive) {
			game.state.start('over');
		}
	},

	checkCollision: function(entity1, entity2) {
		entity1.checkCollision(entity2);
		entity2.checkCollision(entity1);
	},

	checkOverlap: function(entity1, entity2) {
		entity1.checkOverlap(entity2);
		entity2.checkOverlap(entity1);
	},

	render: function() {
		//game.debug.body(this.gameworld.player);
	},
};