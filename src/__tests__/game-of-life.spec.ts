import { getNeighbours, setupBoard } from '../game-of-life';

describe('game-of-life-helpers', () => {
  it('should create a 10x10 board', () => {
    const gol = setupBoard(10, 10);
    expect(gol.length).toBe(10);
    expect(gol[0].length).toBe(10);
  });
  it('should return 8 neighbours', () => {
    const gol = setupBoard(10, 10);
    const n = getNeighbours(gol, 9, 9);
    expect(n.length).toBe(8);
  });
  it('should shift back to row 0', () => {
    const gol = setupBoard(10, 10);
    const n = getNeighbours(gol, 5, 9);
    expect(n[7][1]).toBe(0);
  });
});
