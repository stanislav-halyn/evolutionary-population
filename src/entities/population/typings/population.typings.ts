// Constants
import { CellStatusesE } from '../constants/population.constants';

export type CellT = CellStatusesE.DEAD | CellStatusesE.ALIVE;

export type PopulationT = CellT[][];

export type NeighbourGetterT = (obj: any) => CellT | undefined;

export type CellPositionT = [number, number];
