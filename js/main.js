var all_user_cells = [];
var all_machine_cells = [];

var grid;
var grid_options;
var grid_size;
var user_ship;
var machine_ship;
var past_hits = [];

function start(options) {
	grid_options = options;
	build_grid( options );
	randomly_place_ships();
}

function build_grid(options) {
	var user_board;
	var machine_board;
	var board_size = options;
	var text = "";
	var y;
	var x;

	var cell_dimension = 100 / board_size;

		for(y = 1; y <= board_size; y++) {

			for(x = 1; x <= board_size; x++) {

				text += '<div data-x="' + x + '"' + ' data-y="' + y + '"' + ' class="grid-cell"></div>';
				new_user_cell = $(text)
				all_user_cells.push($(text))
				new_user_cell.css('width', cell_dimension.toString() + '%');
				new_user_cell.css('height', cell_dimension.toString() + '%');
				new_user_cell.addClass('user-grid-cell')
				$('#user_side').append(new_user_cell);
				new_machine_cell = new_user_cell.clone();
				new_machine_cell.removeClass('user-grid-cell');
				new_machine_cell.addClass('machine-grid-cell');
				$('#machine_side').append(new_machine_cell);
				all_machine_cells.push(new_machine_cell)
				text = ''

			}

		};

}

function randomly_place_ships() {

	user_ship = build_ship('user');
	machine_ship = build_ship('machine');


}

function build_ship(target_side) {
	var board_size = grid_options;

	var max_ship_width = _.random(1, (board_size*.5));
	var min_ship_width = _.random(1, (board_size*.2));


	var battleShip = {
		size: _.random(max_ship_width, min_ship_width),
		cells: {},
		hit_cells: [],
		hit_cell_coordinates: function(){
			return _.map(this.hit_cells, function(hit_cell){
				return([hit_cell.data("x"), hit_cell.data("y")]);
			})
		},
		add_hit_cell: function (match) {
			// todo: check that match is not already in hit cells before push
			existing_cell = _.filter(target_side.hit_cells, function(cell){
				return((match.data('x') == cell.data('x')) && (match.data('y') == cell.data('y')));
			})

			if(_.isUndefined(existing_cell)){
				// this.css('background', 'red');
				this.hit_cells.push($(match));

			}

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

	start_cell = find_cell_at(start_x, start_y, target_side);

	ship_cells = [];

	var ship_is_not_too_far_right = function(){
		return( (board_size - start_x) > battleShip['size'] );
	}

	var draw_ship_to_the_right = function () {
		_(battleShip['size']).times(function(n){
			x_index = start_x + n;
			ship_cells.push(find_cell_at(x_index, start_y, target_side));
		});
	}

	var draw_ship_to_the_left = function (){
		_(battleShip['size']).times(function(n){
			x_index = start_x - n;
			ship_cells.push(find_cell_at(x_index, start_y, target_side));
		});
	}

	if( ship_is_not_too_far_right() ) {
		draw_ship_to_the_right();
	} else {
		draw_ship_to_the_left();
	}


	if(target_side=='user') {

		$(ship_cells).css('background', 'blue');
		$(ship_cells).addClass('user-ship-cell');

	} else if(target_side=='machine') {

		$(ship_cells).css('background', 'blue');
		$(ship_cells).addClass('machine-ship-cell');
	};



	battleShip.cells = ship_cells;

	return battleShip;
}



function find_cell_at(x, y, target_side) {
	var selector = "div." + target_side + "-grid-cell[data-x='" + x.toString() + "'][data-y='" + y.toString() + "']";
	return($(selector)[0])
}


function machine_locate(index) {
	var selector = _.find(all_user_cells, function(cell) { return cell == index; });
	return($(selector)[0])
}



function machine_find_cell_at(x, y) {
	var selector = '<div data-x="' + x + '"' + ' data-y="' + y + '"' + ' class="grid-cell user-grid-cell"></div>';
	return ($(selector))

}

// function ship_is_hit() {}


// TASKS

// refactor
// give user ability to set game options
// refactor
// define logic around users taking turns and game completion