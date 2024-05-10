
var board;
var score = 0;
var highscore = localStorage.getItem('highscore') || 0;
var rows = 4;
var columns = 4;

window.onload = () => {
	setGame();
	document.getElementById('highscore').innerHTML = highscore;
}

function setGame() {
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]
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

function setHighscore(score) {
	if (score >= highscore) {
		localStorage.setItem('highscore', score)
		highscore = score;
	}
}

function slide(row) {
	row = row.filter(num => num != 0);
	for (let i = 0; i < row.length; i++) {
		if (row[i] == row[i + 1]) {
			row[i] *= 2;
			row[i + 1] = 0;
			score += row[i];
			setHighscore(score);
		}
	}
	row = row.filter(num => num != 0);
	while (row.length < columns) {
		row.push(0);
	}
	return row;
}

function moveLeft() {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		row = slide(row);
		board[r] = row;
		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}

}

function moveRight() {
	for (let r = 0; r < rows; r++) {
		let row = board[r];
		row.reverse();
		row = slide(row);
		board[r] = row.reverse();
		for (let c = 0; c < columns; c++) {
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}
}

function moveUp() {
	let temp = [[], [], [], []]
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			temp[i][j] = board[j][i];
		}
	}
	for (let c = 0; c < columns; c++) {
		let row = slide(temp[c]);

		for (let r = 0; r < rows; r++) {
			board[r][c] = row[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}
}

function moveDown() {
	let temp = [[], [], [], []]
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < columns; j++) {
			temp[i][j] = board[j][i];
		}
	}
	for (let c = 0; c < columns; c++) {
		temp[c].reverse();
		let row = slide(temp[c]);
		row.reverse();
		for (let r = 0; r < rows; r++) {
			board[r][c] = row[r];
			let tile = document.getElementById(r.toString() + "-" + c.toString())
			updateTile(tile, board[r][c]);
		}
	}
}