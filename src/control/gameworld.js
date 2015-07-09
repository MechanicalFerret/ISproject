Gameworld = function(state) {
	this.state = state;
};

Gameworld.prototype = {
	map: null,
	layers: {playable: null, background1: null, background2: null, foreground: null, objectlayer: null},
	objects: null,

	player: null,
	platforms: null,
	coins: null,
	enemies: null,

	loadLevel: function(index) {
		// Load in the Tilemap
		this.map = this.state.add.tilemap(index);

		// Get all the tileset images and add them
		this.loadImages(index);

		// Load in our Background & Playable Layers
		this.layers.background2 = this.map.createLayer('Background Layer 2');
		this.layers.background1 = this.map.createLayer('Background Layer 1');
		this.layers.playable = this.map.createLayer('Playable Layer');

		// Resize the world to fit the playable layer and setup collision
		this.layers.playable.resizeWorld();
		this.loadTileCollisions();

		// Load in Objects
		this.objects = game.add.group();
		this.loadObjects();

		// Load in our Foreground
		this.layers.foreground = this.map.createLayer('Foreground Layer');
	},

	// What this function does isn't always necessary for a simple game, however it does save a lot of headache
	// when you start using more than one tileset in your levels. All we do is parse through the JSON object of
	// the level we are loading looking for the names of tilesets and then adding them. Just saves time in the long
	// run if all we need to do is pass an index and be done to load a level.
	loadImages: function(index) {
		var tilesets = game.cache.getJSON(index).tilesets;
		for(var i=0; i<tilesets.length; i++) {
			this.map.addTilesetImage(tilesets[i].name);
		}
	},

	// Phaser has an easier way to handle collisions with the map that is less intensive than the way we have
	// been using. How it works is we declare sections of our tilemap as "collideable". In order to not clutter
	// the gameworld class I've moved this code to Tilesets.js
	loadTileCollisions: function() {
		for (var i=0; i<this.map.tilesets.length; i++) {
			Tilesets.load(this.map.tilesets[i].name, this.map, this.layers.playable);
		}
	},

	// The intent of loadObjects is to load in everything that isn't a static tilemap (player, enemies, coins, etc)
	// It is one of the few functions you will have to keep adjusting and expanding. Below you can get an idea of how
	// I load in our objects for this game.
	loadObjects: function() {
		// Create an Object Layer and Objects group
		var array = new Array();
		this.layers.objectlayer = this.map.objects.Objects;

		// Load in the Player
		this.loadObjectsByType('player', array);
		this.player = new Player(game, array[0].x, array[0].y);
		this.objects.add(this.player);

		// Load in Coins
		array = new Array();
		this.coins = game.add.group();
		this.loadObjectsByType('coin', array);
		for (var i=0; i<array.length; i++) {
			this.coins.add(new Coin(game, array[i].x, array[i].y));
		}
		game.global.maxscore = array.length * 10;

		// Load in Spikes
		array = new Array();
		this.enemies = game.add.group();
		this.loadObjectsByType('spike', array);
		for (i=0; i<array.length; i++) {
			this.enemies.add(new Spike(game, array[i].x, array[i].y));
		}
	},

	// loadObjectsByType is a simple function that populates an array with objects loaded in from Tiled. Each object
	// placed in tiled can have a number of properties specified in it, including a Name and Type variable. The type
	// variable MUST match in Tiled as well as in our code.
	loadObjectsByType: function(type, array) {
		for(var i=0; i<this.layers.objectlayer.length; i++) {
			if(this.layers.objectlayer[i].type === type) {
				array.push(this.layers.objectlayer[i]);
			}
		}
	},
};