var grid;

var grid_options = {
	size: 20
}

function start() {
	build_grid( grid_options );
	randomly_place_ships();
}

function build_grid(options) {
	var user_board;
	var machine_board;
	var board_size = options['size'];
	var text = "";
	var y;
	var x;

	var cell_dimension = 100 / board_size;

		for(y = 1; y <= board_size; y++) {

			for(x = 1; x <= board_size; x++) {

				text += '<div data-x="' + x + '"' + ' data-y="' + y + '"' + ' class="grid-cell"></div>';
				new_user_cell = $(text) 
				new_user_cell.css('width', cell_dimension.toString() + '%');
				new_user_cell.css('height', cell_dimension.toString() + '%');
				new_user_cell.addClass('user-grid-cell')
				$('#user_side').append(new_user_cell);
				new_machine_cell = new_user_cell.clone();
				new_machine_cell.removeClass('user-grid-cell');
				new_machine_cell.addClass('machine-grid-cell');
				$('#machine_side').append(new_machine_cell);
				text = ''

			}
		};
}

function randomly_place_ships() {
	var board_size = grid_options['size']

	var max_ship_width = 10;
	var min_ship_width = 5;

	var battleShip = {

		size: _.random(max_ship_width, min_ship_width),
		placement:
			{
				xOne:0,
				yOne:0,

				xTwo:0,
				yTwo:0,

				xThree:0,
				yThree:0,

				xFour:0,
				yFour:0
			}

	}

	// pick random number between variables above
	//var ship_size = 

	// pick random x between 1 and board size
	start_x = _.random(1, board_size);

	// pick random y between 1 and board size
	start_y = _.random(1, board_size);

	// look left/right for x to choose which way to orient ship
	// accomodate ship_size

	start_cell = find_cell_at(start_x, start_y);

	debugger;

	if( (board_size - start_x) > battleShip['size']) {

		battleShip.placement.xOne = start_x;
		battleShip.placement.xTwo = start_x + 1;
		battleShip.placement.xThree = start_x + 2;
		battleShip.placement.xFour = start_x + 3;
		
		//go right

	} else {

		battleShip.placement.xOne = start_x;
		battleShip.placement.xTwo = start_x - 1;
		battleShip.placement.xThree = start_x - 2;
		battleShip.placement.xFour = start_x - 3;

		// go left

	}

	if( (board_size - start_y) > battleShip['size']) {

		battleShip.placement.yOne = start_y;
		battleShip.placement.yTwo = start_y + 1;
		battleShip.placement.yThree = start_y + 2;
		battleShip.placement.yFour = start_y + 3;

		// go up

	} else {

		battleShip.placement.yOne = start_y;
		battleShip.placement.yTwo = start_y - 1;
		battleShip.placement.yThree = start_y - 2;
		battleShip.placement.yFour = start_y - 3;

		// go down

	}

	return console.log(battleShip.placement);



}



function find_cell_at(x, y) {
	var selector = "div.grid-cell[data-x='" + x.toString() + "'][data-y='" + y.toString() + "']";
	return($(selector))
}


// TASKS

// place ships
// refactor
// give user ability to set game options
// refactor
// define logic around users taking turns and game completion