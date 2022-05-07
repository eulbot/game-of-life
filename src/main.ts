import { evolve, setupBoard } from './game-of-life';
import { debounce } from './helpers';

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

function setupCanvas() {
  const w = document.body.clientWidth;
  const h = document.body.clientHeight;
  canvas.width = w;
  canvas.height = h;
  return setupBoard(Math.ceil(w / SQAURE_SIZE), Math.ceil(h / SQAURE_SIZE), 0.85);
}

function init() {
  var gol = setupCanvas();
  var suspend = false;

  window.addEventListener(
    'resize',
    debounce(() => {
      gol = setupCanvas();
    }, 200),
  );

  function isTouch(e: MouseEvent | TouchEvent): e is TouchEvent {
    return (e as TouchEvent).touches !== undefined;
  }

  ['mousedown', 'touchstart'].forEach((t) =>
    window.addEventListener(t, (e: MouseEvent | TouchEvent) => {
      suspend = true;
      hydrate(isTouch(e) ? e.touches[0] : e);
    }),
  );

  ['mousemove', 'touchmove'].forEach((t) =>
    window.addEventListener(t, (e: MouseEvent | TouchEvent) => hydrate(isTouch(e) ? e.touches[0] : e)),
  );

  ['mouseup', 'touchend'].forEach((t) => window.addEventListener(t, (e: MouseEvent | TouchEvent) => (suspend = false)));

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

init();
