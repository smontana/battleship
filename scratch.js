function randomly_place_ships() {
	var board_size = grid_options['size']

	var max_ship_width = 10;
	var min_ship_width = 5;

	var battleShip = {

		width: Math.floor(Math.random() * max_ship_width) + min_ship_width

	}

	debugger;

	

	var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};


//Math.floor(Math.random() * 6) + 1 = BETWEEN 1-6





	//max board_size = 30
	//min board_size = 5




	// pick random number between variables above
	//var ship_size = 

	// pick random x between 1 and board size

	// pick random y between 1 and board size

	// look left/right for x to choose which way to orient ship
	// accomodate ship_size
}


// TASKS

// place ships
// refactor
// give user ability to set game options
// refactor
// define logic around users taking turns and game completion







// Ships from game: carrierShip [5 spaces]  ||  battleShip [4 spaces] ||  cruiserShip [3]  ||  submarineShip [3]  ||  destroyerShip [2]

// Board from game: 10x10