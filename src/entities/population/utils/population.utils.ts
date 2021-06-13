// Modules
import { path, equals, sum } from 'ramda';

// Constants
import { CellStatusesE } from '../constants/population.constants';

// Typings
import { CellT, CellPositionT, NeighbourGetterT, PopulationT } from '../typings/population.typings';

// Entities
import { numberUtils } from '@entities/number';

/**
 * Returns true if the cell is alive
 */
const isAlive = (cell: CellT) => cell === CellStatusesE.ALIVE;

/**
 * Returns true if the cell is dead
 */
const isDead = (cell: CellT) => cell === CellStatusesE.DEAD;

/**
 * Gets indexes for the neighbours rows
 */
const getNeighboursRows = (rowIndex: number) => [rowIndex - 1, rowIndex, rowIndex + 1].filter(numberUtils.isPositive);

/**
 * Gets indexes for the neighbours cell
 */
const getNeighboursCells = (cellIndex: number) =>
  [cellIndex - 1, cellIndex, cellIndex + 1].filter(numberUtils.isPositive);

/**
 * Maps row index and cell index into a position item
 */
const mapPosition = ({ rowIndex, cellIndex }: { rowIndex: number; cellIndex: number }): CellPositionT => [
  rowIndex,
  cellIndex,
];

/**
 * Filters the current cell, so we don't count it as a neighbour
 */
const filterCurrentCell = ({
  cellPosition,
  currentCellPosition,
}: {
  cellPosition: CellPositionT;
  currentCellPosition: CellPositionT;
}) => !equals(cellPosition, currentCellPosition);

/**
 * Generates neighbours getters
 */
const generateNeighboursGetters = ({ rowIndex, cellIndex }: { rowIndex: number; cellIndex: number }) => {
  const neighboursRowsIndexes = getNeighboursRows(rowIndex);
  const neighboursCellsIndexes = getNeighboursCells(cellIndex);

  const currentCellPosition = mapPosition({ rowIndex, cellIndex });

  const getters = neighboursRowsIndexes.reduce((acc, neighbourRowIndex) => {
    const rowGetters = neighboursCellsIndexes
      .map(neighbourCellIndex => mapPosition({ rowIndex: neighbourRowIndex, cellIndex: neighbourCellIndex }))
      .filter(cellPosition => filterCurrentCell({ cellPosition, currentCellPosition }))
      .map(cellPosition => path<CellT>(cellPosition));

    return [...acc, ...rowGetters];
  }, [] as NeighbourGetterT[]);

  return getters;
};

/**
 * Gets all the neighbours of a cell.
 */
const getNeighbours = ({
  rowIndex,
  cellIndex,
  populationMatrix,
}: {
  rowIndex: number;
  cellIndex: number;
  populationMatrix: PopulationT;
}) => generateNeighboursGetters({ rowIndex, cellIndex }).map(getCell => getCell(populationMatrix)!);

/**
 * Calculates sum of alive neighbours
 */
const calculateAliveNeighbours = ({
  rowIndex,
  cellIndex,
  populationMatrix,
}: {
  rowIndex: number;
  cellIndex: number;
  populationMatrix: PopulationT;
}) => {
  const aliveNeighbours = getNeighbours({ rowIndex, cellIndex, populationMatrix }).filter(isAlive);

  return sum(aliveNeighbours);
};

/**
 * Gets cell's next tick status depending on different scenarios.
 * The rules for each scenario are the following:
 * - any live cell with fewer than two live neighbours dies (underpopulation).
 * - any live cell with two or three live neighbours lives on to the next generation.
 * - any live cell with more than three live neighbours dies (overcrowding).
 * - any dead cell with exactly three live neighbours becomes a live cell (reproduction)
 */
const getCellNextStatus = ({
  rowIndex,
  cellIndex,
  populationMatrix,
}: {
  rowIndex: number;
  cellIndex: number;
  populationMatrix: PopulationT;
}) => {
  const currentCell = path<CellT>([rowIndex, cellIndex], populationMatrix)!;
  const neighboursSum = calculateAliveNeighbours({ rowIndex, cellIndex, populationMatrix });

  if (isAlive(currentCell)) {
    if (neighboursSum < 2) {
      return CellStatusesE.DEAD;
    }

    if (neighboursSum === 2 || neighboursSum === 3) {
      return CellStatusesE.ALIVE;
    }

    if (neighboursSum > 3) {
      return CellStatusesE.DEAD;
    }
  }

  if (isDead(currentCell)) {
    if (neighboursSum === 3) {
      return CellStatusesE.ALIVE;
    }
  }

  return CellStatusesE.DEAD;
};

/**
 * Makes a lifecycle tick of the population.
 * With each tick, a cell either dies, becomes alive
 * or lives on to the next generation.
 */
export const tick = (populationMatrix: PopulationT) =>
  populationMatrix.map((row, rowIndex) =>
    row.map((_, cellIndex) => getCellNextStatus({ rowIndex, cellIndex, populationMatrix }))
  );
