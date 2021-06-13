// Utils
import * as populationUtils from './utils/population.utils';

/**
 * NOTE: we need to do `import * as entityUtils`
 * and export after that since eslint doesn't support
 * named exports yet
 */
export { populationUtils };

// Constants
export * from './constants/population.constants';

// Typings
export * from './typings/population.typings';
