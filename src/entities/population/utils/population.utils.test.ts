// Utils
import { tick, generatePopulation, isAlive, isDead } from './population.utils';

// Typings
import { PopulationT } from '../typings/population.typings';

// Constants
import { CellStatusesE } from '../constants/population.constants';

describe('population.utils.ts', () => {
  describe('tick()', () => {
    test('any live cell with fewer than two live neighbours dies', () => {
      const populationMatrix: PopulationT = [
        [1, 0],
        [0, 0],
      ];

      expect(tick(populationMatrix)).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });

    test('any live cell with two or three live neighbours lives on to the next generation', () => {
      const populationMatrix: PopulationT = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ];

      expect(tick(populationMatrix)).toEqual([
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
      ]);
    });

    test('any live cell with more than three live neighbours dies', () => {
      const populationMatrix: PopulationT = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      expect(tick(populationMatrix)).toEqual([
        [1, 0, 1],
        [0, 0, 0],
        [1, 0, 1],
      ]);
    });

    test('any dead cell with exactly three live neighbours becomes a live cell', () => {
      const populationMatrix: PopulationT = [
        [0, 1],
        [1, 1],
      ];

      expect(tick(populationMatrix)).toEqual([
        [1, 1],
        [1, 1],
      ]);
    });

    test('any dead cell with a sum of live neighbours different than three remains dead', () => {
      const populationMatrix: PopulationT = [
        [0, 0],
        [0, 0],
      ];

      expect(tick(populationMatrix)).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });
  });

  describe('generatePopulation()', () => {
    test('should return a matrix of population', () => {
      const rows = 2;
      const cells = 2;

      const population = generatePopulation({ rows, cells });

      expect(population).toHaveLength(rows);

      population.forEach(row => {
        expect(row).toHaveLength(cells);

        row.forEach(cell => {
          expect([CellStatusesE.ALIVE, CellStatusesE.DEAD]).toContain(cell);
        });
      });
    });
  });

  describe('isAlive()', () => {
    test('should return true is a cell is alive', () => {
      expect(isAlive(CellStatusesE.ALIVE)).toBe(true);
    });

    test('should return false is a cell is dead', () => {
      expect(isAlive(CellStatusesE.DEAD)).toBe(false);
    });
  });

  describe('isDead()', () => {
    test('should return true is a cell is dead', () => {
      expect(isDead(CellStatusesE.DEAD)).toBe(true);
    });

    test('should return false is a cell is alive', () => {
      expect(isDead(CellStatusesE.ALIVE)).toBe(false);
    });
  });
});
