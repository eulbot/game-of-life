function getNeighbours(gol: boolean[][], col: number, row: number): number[][] {
  const rows = gol.length - 1;
  const cols = gol[0].length - 1;

  return [col == 0 ? rows : col - 1, col, col >= rows ? 0 : col + 1]
    .flatMap((c) => [row == 0 ? cols : row - 1, row, row >= cols ? 0 : row + 1].map((r) => [c, r]))
    .filter((v) => !(v[0] == col && v[1] == row));
}

const neighbors = (gol: boolean[][], col: number, row: number) => {
  const width = gol.length;
  const height = gol[0].length;
  let result = 0;

  const cols = [col == 0 ? width - 1 : col - 1, col, col + 1 >= width ? 0 : col + 1];
  const rows = [row == 0 ? height - 1 : row - 1, row, row + 1 >= height ? 0 : row + 1];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!(i == 1 && j == 1)) {
        result += gol[cols[i]][rows[j]] ? 1 : 0;
      }
    }
  }
  return result;
};

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

  return prev;
}

export { getNeighbours, setupBoard };
