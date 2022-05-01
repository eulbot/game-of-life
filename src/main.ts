
const SQAURE_SIZE = 20;


function setupGame(width: number, height: number) {
	const x = Math.ceil(width / SQAURE_SIZE);
	const y = Math.ceil(height / SQAURE_SIZE);
	return Array<number>(x).fill(0)
		.map(() => Array<number>(y).fill(0)
			.map(() => Math.random() > 0.85 ? 1 : 0));
}

function drawBoard(gol: number[][]) {
	const canvas = document.getElementById("playground") as HTMLCanvasElement;
	const ctx = canvas.getContext("2d");

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let x = 0; x < gol.length; x++) {
		for (let y = 0; y < gol[x].length; y++) {
			ctx.fillStyle = gol[x][y] ? "black" : "white";
			ctx.fillRect(x * SQAURE_SIZE, y * SQAURE_SIZE, SQAURE_SIZE - 1, SQAURE_SIZE - 1);
		}
	}
}

function evole(prev: number[][]) {

	let gol = prev.map(inner => inner.slice())

	const neighbors = (x: number, y: number) => {
		let result = 0, width = gol.length, height = gol[0].length;
		const cols = [x == 0 ? width - 1 : x - 1, x, x + 1 >= width ? 0 : x + 1];
		const rows = [y == 0 ? height - 1 : y - 1, y, y + 1 >= height ? 0 : y + 1];

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (!(i == 1 && j == 1))
					result += prev[cols[i]][rows[j]] ? 1 : 0;
			}
		}
		return result;
	}

	for (let x = 0; x < gol.length; x++) {
		for (let y = 0; y < gol[x].length; y++) {
			const n = neighbors(x, y);
			if(gol[x][y] == 0 && (n == 3))
				gol[x][y] = 1;
			if(gol[x][y] == 1 && !(n == 2 || n == 3))
				gol[x][y] = 0;
		}
	}

	return gol;
}

function init() {
	const canvas = document.getElementById("playground") as HTMLCanvasElement;
	const w = document.body.clientWidth;
	const h = document.body.clientHeight;

	canvas.width = w;
	canvas.height = h;

	var gol = setupGame(w, h) as number[][];

	function animate() {
		const fps = 10;

		drawBoard(gol);
		gol = evole(gol);

		setTimeout(() => {
			requestAnimationFrame(animate);
		}, 1000 / fps);
	}
	animate();
}


//document.addEventListener('resize', setupBoard);
init();