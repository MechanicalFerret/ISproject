var bootState = {
	init: function() {

	},
	preload: function() {
		game.load.image('progressBar', 'assets/progress_bar.png');
	},
	create: function() {
		game.state.start('load');
	},
	update: function() {},
};