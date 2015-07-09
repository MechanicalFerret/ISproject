Tilesets = {};

Tilesets.load = function(type, map, layer) {
	switch(type) {
		case "ruins":
			Tilesets.ruins(map, layer);
			break;
	}
}

Tilesets.ruins = function(map, layer) {
	map.setCollisionBetween(26, 35, true, layer);
	map.setCollisionBetween(41, 53, true, layer);
	map.setCollisionBetween(60, 72, true, layer);
	map.setCollisionBetween(79, 84, true, layer);
	map.setCollisionBetween(102, 105, true, layer);
	map.setCollisionBetween(105, 108, true, layer);
}