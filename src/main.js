var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Global variables go below
game.global = {
	score: 0,
	maxscore: 0,
	gameworld: null,
};

// Declare and start our Game States 
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('over', overState);
game.state.start('boot');