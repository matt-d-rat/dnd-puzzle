import { createContext } from 'react';
import units from 'units-css';

const gridSize = window
  .getComputedStyle(document.documentElement)
  .getPropertyValue('--grid-size');

const size = units.parse(gridSize);

const GridContext = createContext({ size, width: null, height: null });

export default GridContext;
export { GridContext };
