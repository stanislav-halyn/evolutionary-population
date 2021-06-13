// Utils
import { tick } from './population.utils';

// Constants
import { PopulationT } from '../typings/population.typings';

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
});
