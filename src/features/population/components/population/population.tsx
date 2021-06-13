// Modules
import React, { useEffect, useState } from 'react';
import CSSModules from 'react-css-modules';

// Entities
import { populationUtils, PopulationT } from '@entities/population';

// Components
import Cell from '../cell';

// Constants
import { POPULATION_TICK_INTERVAL_MS } from '../../constants/population.constants';

// Styles
import styles from './population.scss';

/**
 * Local typings
 */
interface PopulationPropsI {
  initialPopulation: PopulationT;
}

/**
 * @component Population
 */
const Population = ({ initialPopulation }: PopulationPropsI) => {
  const [population, setPopulation] = useState(initialPopulation);

  useEffect(() => {
    const tickTimerId = setTimeout(() => {
      const updatedPopulationMatrix = populationUtils.tick(population);

      /**
       * NOTE: I could've added a condition to
       * update the UI only if the matrix has changed,
       * but I decided not to do it so far since the performance
       * seems to be ok
       */
      setPopulation(updatedPopulationMatrix);
    }, POPULATION_TICK_INTERVAL_MS);

    return () => {
      clearTimeout(tickTimerId);
    };
  }, [population]);

  return (
    <div styleName="common">
      <table styleName="table">
        <tbody>
          {population.map((row, rowIndex) => (
            <tr key={`population-row-${rowIndex}`} data-testid={`population-row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`population-cell-${rowIndex}-${cellIndex}`}>
                  <Cell dataTestId={`population-cell-${rowIndex}-${cellIndex}`} value={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CSSModules(Population, styles);
