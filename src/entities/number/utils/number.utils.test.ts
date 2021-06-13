// Utils
import { isPositive } from './number.utils';

describe('number.utils.ts', () => {
  describe('isPositive()', () => {
    test.each([
      [-3, false],
      [0, true],
      [10, true],
    ])('should return correct result', (num, expectedResult) => {
      expect(isPositive(num)).toEqual(expectedResult);
    });
  });
});
