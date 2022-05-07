import { evolve, setupBoard } from './game-of-life';

const SQAURE_SIZE = 20;
const canvas = document.getElementById('playground') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

function drawBoard(gol: boolean[][]) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 1, canvas.width, canvas.height);

  for (let x = 0; x < gol.length; x++) {
    for (let y = 0; y < gol[x].length; y++) {
      ctx.fillStyle = gol[x][y] ? 'black' : 'white';
      ctx.fillRect(x * SQAURE_SIZE, y * SQAURE_SIZE, SQAURE_SIZE - 1, SQAURE_SIZE - 1);
    }
  }
}

function init() {
  var suspend = false;
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;

  canvas.width = w;
  canvas.height = h;

  var gol = setupBoard(Math.ceil(w / SQAURE_SIZE), Math.ceil(h / SQAURE_SIZE), 0.85);

  canvas.addEventListener('mousedown', (e) => {
    suspend = true;
    hydrate(e);
  });
  canvas.addEventListener('mousemove', (e) => hydrate(e));
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length <= 0) return 0;
    hydrate(e.touches[0]);
  });
  canvas.addEventListener('mouseup', () => (suspend = false));

  function hydrate(e: MouseEvent | Touch) {
    if (!suspend) return 0;
    let x = Math.floor(e.pageX / SQAURE_SIZE);
    let y = Math.floor(e.pageY / SQAURE_SIZE);
    gol[x][y] = true;
    drawBoard(gol);
  }

  function animate() {
    const fps = 10;

    if (!suspend) {
      drawBoard(gol);
      gol = evolve(gol);
    }

    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000 / fps);
  }
  animate();
}

//document.addEventListener('resize', setupBoard);
init();
