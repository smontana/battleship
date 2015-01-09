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
				new_user_cell.css('width', cell_dimension.toString() + '%');
				new_user_cell.css('height', cell_dimension.toString() + '%');
				new_user_cell.addClass('user-grid-cell')
				$('#user_side').append(new_user_cell);
				all_user_cells.push(find_cell_at(new_user_cell.data("x"), new_user_cell.data("y"), 'user'))
				new_machine_cell = new_user_cell.clone();
				new_machine_cell.removeClass('user-grid-cell');
				new_machine_cell.addClass('machine-grid-cell');
				$('#machine_side').append(new_machine_cell);
				all_machine_cells.push(find_cell_at(new_machine_cell.data("x"), new_machine_cell.data("y"), 'machine'))
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

	// debugger;
	//determining ship placement - x axis or y axis
	//1 = x | 2 = y

	place_x_or_y_axis = _.random(1, 2);

	if (place_x_or_y_axis == 1) {

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

	} else if(place_x_or_y_axis == 2) {

		var ship_is_not_too_far_up = function(){
			return( (board_size - start_y) > battleShip['size'] );
		}

		var draw_ship_up = function () {
			_(battleShip['size']).times(function(n){
				y_index = start_y + n;
				ship_cells.push(find_cell_at(start_x, y_index, target_side));
			});
		}

		var draw_ship_down = function (){
			_(battleShip['size']).times(function(n){
				y_index = start_y - n;
				ship_cells.push(find_cell_at(start_x, y_index, target_side));
			});
		}

		if( ship_is_not_too_far_up() ) {
			draw_ship_up();
		} else {
			draw_ship_down();
		}

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


function set_game_options () {
	$("#start_button").click(function(event){

              game_options = {

                difficulty_selections: {
                  easy: {
                    title:"Easy",
                    grid_size: 5
                  },

                  medium: {
                    title: "Medium",
                    grid_size: 10
                  },

                  hard: {
                    title: "Hard",
                    grid_size: 15
                  },

                  impossible: {
                    title:"Impossible",
                    grid_size: 20
                  },

                },

                forKeyString: function(key_string) {
                  difficulty_selection_keys = Object.keys(this.difficulty_selections);

                  selected_option = _.filter(difficulty_selection_keys, function(key) {
                    return(key == key_string);

                  });

                  return(this.difficulty_selections[selected_option])

                }

              }

              $.each(game_options.difficulty_selections, function(key, value){
                option = $("<option/>")
                option.val(key)
                option.text(value.title)

                //need to find out how to append data in function above so I can append data-size = value.grid_size for machine_logic

                $("#game_options select").append(option)
                $("#game_options").fadeIn();
                $("#start_button").fadeOut();

              })

            })

	$( "#game_options .submit" ).click(function( event ) {
              var selectedOption = $( "option:selected" ).val();
              var selected_difficulty = game_options.forKeyString(selectedOption);
              var size = selected_difficulty.grid_size;
              grid_size = size;

              start(size);
              $("#game_options").fadeOut();
              $("#machine_fire").fadeIn();
              $("#user_lightbox").fadeIn();

              game_handlers();

            })

}


function ingame_handlers() {
	game_handlers = (function(){$(".grid-cell").click(function(event){
              var x = $(this).data("x");
              var y = $(this).data("y");
              var total_possible_hits = machine_ship.size;

              match = _.find(machine_ship.cells, function(cell){
                return($(cell).data("x") == x && $(cell).data("y") == y);
              })

              if($(this).hasClass("user-grid-cell")==true) {
                alert('wrong board, dummy')

              } else if($(this).hasClass("hit-cell")) {
                alert('you already fired there, moron');

              } else if(_.isUndefined(match)) {
                alert('miss!')

              } else {
                alert('hit!')
                machine_ship.add_hit_cell(match)
                $(this).addClass('hit-cell')
                $(this).css('background', 'red')
              }

                // TODO: expand for more ship = something like sunk_machine_ships.add_sunk_ship(match something unique like name from each ship)

              })

            })

}


function machine_fire_logic() {
	$("#machine_fire").click(function(event){

              var first_cell = all_user_cells[0];
              var last_cell_finder = all_user_cells.length - 1;
              var last_cell = all_user_cells[(last_cell_finder)];

              var random_cell_selector = _.random(0, last_cell_finder);
              var cell_selected_div = all_user_cells[(random_cell_selector)];

              var cell_selected_x = $(cell_selected_div).data("x");
              var cell_selected_y = $(cell_selected_div).data("y");

              var match = find_cell_at(cell_selected_x, cell_selected_y, 'user');

              var remaining_unique_hits = all_user_cells;
              var hit_index = match;

              all_user_cells = jQuery.grep(all_user_cells, function(value) {
                return value != hit_index;
              })

              if($(match).hasClass("user-ship-cell")) {
                alert("The Machine hit your ship = X: " + cell_selected_x + " " + "Y: " + cell_selected_y )
                $(match).addClass('hit-cell')
                $(match).css('background', 'red')
                past_hits.push(match);

              } else {
                alert("The Machine missed = X: " + cell_selected_x + " " + "Y: " + cell_selected_y )
                $(match).addClass('hit-cell')
                $(match).css('background', 'red')
                past_hits.push(match);

              }

            })

}


// function ship_is_hit() {}


// TASKS

// refactor
// give user ability to set game options
// refactor
// define logic around users taking turns and game completion