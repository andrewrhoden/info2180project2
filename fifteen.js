 
	var width = 300;		var length = 300;			var BLOCK = [];

 
window.onload = function() {
  generateBLOCK();
  $("shufflebutton").observe("click", shuffle);
};


function generateBLOCK() {
	BLOCK = $$('#puzzlearea div');
	var j = 0;
	var t = 3;
	for (var i = 0; i < BLOCK.length; i++) {
		for (var x = 0; x <= t; x++) {
			BLOCK[i].addClassName("puzzlepiece");
			BLOCK[i].style.top = 100 * j + "px";
			BLOCK[i].style.left = 100 * x  + "px";
			BLOCK[i].style.backgroundPosition = -x * 100 + "px " + j * -100 + "px";
			BLOCK[i].observe("click", moveTile);
			BLOCK[i].observe("mouseover", hover);
			i++;
		}
		j++;
		if (j > 2) {
			t = 2;
		}
		i--;
	}
}	

 
 function hover(event) {
	if (neighborTest(this.style.left, this.style.top)) {
		this.addClassName("movablepiece");
	} else if (this.hasClassName("movablepiece")) {
		this.removeClassName("movablepiece");
	}
}

 
function moveTileHelp(tile) {
	if (neighborTest(tile.style.left, tile.style.top)) {
		var tempX = tile.style.left;
		var tempY = tile.style.top;
		tile.style.left = width + "px";
		tile.style.top = length + "px";
		width = parseInt(tempX);
		length = parseInt(tempY);
	}
}


function moveTile(event) 
{
	moveTileHelp(this);
}


function shuffle() {
	var temp = [];
	for (var i = 0; i < 200; i++) {
		for (var j = 0; j < BLOCK.length; j++) {
			if (neighborTest(BLOCK[j].style.left, BLOCK[j].style.top)) {
				temp.push(BLOCK[j]);
			}
		}
		moveTileHelp(temp[Math.floor(Math.random() * temp.length)]);
		temp = [];
	}
}


function neighborTest(x, y) {
	if (Math.abs(length - parseInt(y)) == 100) {
		if (Math.abs(width - parseInt(x)) == 0) {
			return true;
		}
	} else if (Math.abs(width - parseInt(x)) == 100) {
		if (Math.abs(length - parseInt(y)) == 0) {
			return true;
		}
	}
	return false;
}
