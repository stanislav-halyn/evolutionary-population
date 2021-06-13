// Modules
import React from 'react';

// Features
import { Population } from '@features/population';

// Entities
import { populationUtils } from '@entities/population';

/**
 * Local constants
 */
const initialPopulation = populationUtils.generatePopulation({ rows: 50, cells: 50 });

/**
 * Root app component
 */
const App = () => <Population initialPopulation={initialPopulation} />;

export default App;
