function getNeighbours(gol: boolean[][], col: number, row: number): Array<{ c: number; r: number }> {
  const rows = gol.length - 1;
  const cols = gol[0].length - 1;

  return [col == 0 ? rows : col - 1, col, col >= rows ? 0 : col + 1]
    .flatMap((c) => [row == 0 ? cols : row - 1, row, row >= cols ? 0 : row + 1].map((r) => ({ c: c, r: r })))
    .filter((v) => !(v.c == col && v.r == row));
}

function getLiveCount(gol: boolean[][], col: number, row: number) {
  const neighbors = getNeighbours(gol, col, row);
  return neighbors.reduce((p, n) => p + (gol[n.c][n.r] ? 1 : 0), 0);
}

function setupBoard(cols: number, rows: number, seed?: number) {
  return Array<boolean>(cols)
    .fill(false)
    .map(() =>
      Array<boolean>(rows)
        .fill(false)
        .map(() => (seed && Math.random() > seed ? true : false)),
    );
}

function evolve(gol: boolean[][]): boolean[][] {
  let prev = gol.map((inner) => inner.slice());

  for (let x = 0; x < gol.length; x++) {
    for (let y = 0; y < gol[x].length; y++) {
      const n = getLiveCount(prev, x, y);
      if (gol[x][y] == false && n == 3) gol[x][y] = true;
      if (gol[x][y] == true && !(n == 2 || n == 3)) gol[x][y] = false;
    }
  }
  return gol;
}

export { getNeighbours, setupBoard, evolve };
