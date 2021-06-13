// Modules
import React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';

// Entities
import { CellStatusesE, populationUtils } from '@entities/population';

// Styles
import styles from './cell.scss';

/**
 * Local typings
 */
interface CellPropsI {
  dataTestId?: string;
  value: CellStatusesE;
}

/**
 * @component Cell
 */
const Cell = ({ dataTestId, value }: CellPropsI) => (
  <div
    styleName={classNames('cell', {
      isAlive: populationUtils.isAlive(value),
      isDead: populationUtils.isDead(value),
    })}
    data-testid={dataTestId}
  />
);

export default CSSModules(Cell, styles, { allowMultiple: true });
