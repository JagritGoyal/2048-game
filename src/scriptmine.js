
var board;
var score = 0;
// var highscore = 0;
var highscore = localStorage.getItem('highscore') || 0;
var rows = 4;
var columns = 4;

window.onload = () => {
	setGame();
	document.getElementById('highscore').innerHTML = highscore;
}

function setGame() {
	board = [
		[2, 0, 0, 2],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
	// board = [
	// 	[8, 16, 4, 32],
	// 	[4, 16, 4, 8],
	// 	[2, 4, 8, 8],
	// 	[4, 2, 2, 8]
	// ]
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			//creating a box for every number
			let tile = document.createElement("div");
			tile.id = r.toString() + "-" + c.toString();
			let num = board[r][c];
			updateTile(tile, num);
			document.getElementById("board").appendChild(tile);
		}
	}

	addTwo();
	addTwo();
}

function addTwo() {
	let zeroIndexes = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (board[r][c] === 0) {
				zeroIndexes.push([r, c]);
			}
		}
	}
	if (zeroIndexes.length > 0) {
		let randomIndex = Math.floor(Math.random() * zeroIndexes.length);
		let r = zeroIndexes[randomIndex][0];
		let c = zeroIndexes[randomIndex][1];
		board[r][c] = 2;
		let tile = document.getElementById(r.toString() + "-" + c.toString())
		tile.innerText = "2"
		tile.classList.add("x2")
	}
}

function updateTile(tile, num) {
	tile.innerText = "";
	tile.classList.value = "";
	tile.classList.add("tile");

	if (num > 0) {
		tile.innerText = num;
		if (num <= 4096) {
			tile.classList.add("x" + num);
		} else {
			tile.classList.add("x8192");
		}
	}
}
function setHighscore(score) {
	if (score >= highscore) {
		localStorage.setItem('highscore', score)
		highscore = score;
	}
}

document.addEventListener("keyup", (e) => {
	if (e.key === "ArrowLeft") {
		moveLeft();
		addTwo();
	} else if (e.key === "ArrowRight") {
		moveRight();
		addTwo();
	} else if (e.key === "ArrowUp") {
		moveUp();
		addTwo();
	} else if (e.key === "ArrowDown") {
		moveDown();
		addTwo();
	}
	document.getElementById('score').innerHTML = score;
	
	document.getElementById('highscore').innerHTML = highscore;
})


function moveLeft() {
	for (let r = 0; r < rows; r++) {
		board[r] = board[r].filter(num => num != 0);
		for (let c = 0; c < columns - 1; c++) {
			if (board[r][c] == board[r][c + 1]) {
				board[r][c] *= 2;
				board[r][c + 1] = 0;
				score += board[r][c];
				setHighscore(score);
			}
		}
		board[r] = board[r].filter(num => num != 0);
		console.log(board);
		while (board[r].length < columns) {
			board[r][board[r].length] = 0;
		}
		console.log(board);
		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}

}

function moveRight() {
	for (let r = 0; r < rows; r++) {
		board[r].reverse();
		board[r] = board[r].filter(num => num != 0);
		for (let c = 0; c < columns - 1; c++) {
			if (board[r][c] == board[r][c + 1]) {
				board[r][c] *= 2;
				board[r][c + 1] = 0;
				score += board[r][c];
				setHighscore(score);
			}
		}
		board[r] = board[r].filter(num => num != 0);
		while (board[r].length < columns) {
			board[r][board[r].length] = 0;
		}
		board[r].reverse();
		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}
}

function moveUp() {
	for (let c = 0; c < columns; c++) {
		for (let r = 0; r < rows - 1; r++) {
			if (board[r][c] == board[r + 1][c]) {
				board[r][c] *= 2;
				board[r + 1][c] = 0;
				score += board[r][c];
				setHighscore(score);
			}
		}
		let col = board.map((num, index) => { return num[c]; }).filter(num => num != 0)
		for (let r = 0; r < rows; r++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			if (col[r]) {
				board[r][c] = col[r];
			} else {
				board[r][c] = 0;
			}
			updateTile(tile, board[r][c]);
		}
	}
}

function moveDown() {
	for (let c = 0; c < columns; c++) {
		for (let r = 3; r > 0; r--) {
			if (board[r][c] == board[r - 1][c]) {
				board[r][c] *= 2;
				board[r - 1][c] = 0;
				score += board[r][c];
				setHighscore(score);
			}
		}
		let col = board.map((num, index) => { return num[c]; }).filter(num => num != 0)
		while (col.length < columns) {
			col.unshift(0);
		}
		for (let r = 0; r < rows; r++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			if (col[r]) {
				board[r][c] = col[r];
			} else {
				board[r][c] = 0;
			}
			updateTile(tile, board[r][c]);
		}
	}
}