var grid;

var grid_options = {
  size: 10
}

function start() {
  build_grid( grid_options );
  randomly_place_ships()
}

function build_grid(options) {
  var user_board;
  var machine_board;

  var board_size = options['size']

  var i = 0;
	'<div data-x="' + '' + " data-y=" 'class="grid-cell"></div>'

}

function randomly_place_ships() {

};




//slightly redone

var grid;

var grid_options = {
	size: 4
}

function start() {
	build_grid( grid_options);
	randomly_place_ships();
}

 function build_grid(options) {
	size=4;

	var cells = " ";
	var i = 0;

	while(i <= size) {

		i2 = 0;

		while(i2 <= size) {
			cells += '<div data-x="' + i + '" data-y="' + i2 + '" class="grid-cell"></div>';
			i2++;
		}

		i++;
	}

	return cells;
};

function randomly_place_ships() {
	var position = Math.floor(Math.random() *)