// Modules
import React from 'react';
import { render, act } from '@testing-library/react';

// Components
import Population from './population';

// Entities
import { PopulationT } from '@entities/population';

jest.useFakeTimers();

/**
 * Local constants
 */
const DEFAULT_INITIAL_POPULATION = [
  [0, 1],
  [1, 1],
];

/**
 * Renders component with predefined set of props
 */
const renderComponent = (
  { initialPopulation = DEFAULT_INITIAL_POPULATION } = {} as { initialPopulation: PopulationT }
) => render(<Population initialPopulation={initialPopulation} />);

describe('<Population />', () => {
  test('should render correctly', () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('population-cell-0-0')).toHaveClass('isDead');
    expect(getByTestId('population-cell-0-1')).toHaveClass('isAlive');
    expect(getByTestId('population-cell-1-0')).toHaveClass('isAlive');
    expect(getByTestId('population-cell-1-1')).toHaveClass('isAlive');
  });

  test('should tick correctly', () => {
    const { getByTestId } = renderComponent();

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(getByTestId('population-cell-0-0')).toHaveClass('isAlive');
    expect(getByTestId('population-cell-0-1')).toHaveClass('isAlive');
    expect(getByTestId('population-cell-1-0')).toHaveClass('isAlive');
    expect(getByTestId('population-cell-1-1')).toHaveClass('isAlive');
  });
});
