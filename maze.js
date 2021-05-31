const maze = [
	['#', '#', '#', '#', '#', '#', '#', '#', '#'],

	['#', '+', '+', '+', '#', '+', '+', '+', '#'],

	['#', '+', '#', '+', '#', '+', '#', '+', '#'],

	['#', '+', '#', '+', '0', '+', '#', '+', '+'],

	['#', '#', '#', '+', '#', '#', '#', '#', '#'],

	['#', '#', '+', '+', '#', '#', '#', '#', '#'],

	['#', '#', '+', '#', '#', '#', '#', '#', '#'],

	['#', '#', '#', '#', '#', '#', '#', '#', '#'],
]

const findStart = (maze) => {

	for (let i = 0; i < maze.length; i += 1) {
		let x = maze[i].findIndex((el) => el === '0');
		let y = i;

		if (x != -1) {
			return { turn: null, coords: { x, y } }
		}
	}
}

const isExit = (position) => (position.coords.x === 0 || position.coords.x === 8) || (position.coords.y === 0 || position.coords.y === 8) ? true : false;
const isVaildWay = (maze, { turn, coords }) => maze[coords.y][coords.x] === '+' ? true : false;
const isTurnBack = (newTurn, perviousTurn) => newTurn.x === perviousTurn.coords.x & newTurn.y === perviousTurn.coords.y ? true : false;

const checkPath = (maze, position, pervious = { turn: null, coords: { x: null, y: null } }) => {

	const possibleTurns = [
		{ turn: 'right', coords: { x: position.coords.x + 1, y: position.coords.y } },
		{ turn: 'left', coords: { x: position.coords.x - 1, y: position.coords.y } },
		{ turn: 'top', coords: { x: position.coords.x, y: position.coords.y - 1 } },
		{ turn: 'bottom', coords: { x: position.coords.x, y: position.coords.y + 1 } },
	];

	const filtered = possibleTurns    //варианты без шага "назад" и стены (#)
		.filter(({ turn, coords }) => !isTurnBack(coords, pervious))
		.filter((el) => isVaildWay(maze, el));

	if (isExit(position)) { // базовый случай рекурсии
		return 'exit'
	}

	for (let i = 0; i < filtered.length; i += 1) {

		if (checkPath(maze, filtered[i], position)) {
			return [filtered[i].turn, checkPath(maze, filtered[i], position)].flat();
		}
	}
}

console.log(checkPath(maze, findStart(maze)))
