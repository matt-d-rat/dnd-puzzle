import units from 'units-css';
import isNumber from 'lodash.isnumber';
import isNil from 'lodash.isnil';

function boardDimension(props, propName, componentName) {
  const gridSize = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--grid-size');

  const size = units.parse(gridSize);
  const value = props[propName];

  if (isNil(value)) {
    return;
  }

  if (!isNumber(value)) {
    return new Error(`Invalid Prop: "${propName}" supplied to "${componentName}".
      Value is not a number
    `);
  }

  if (value % size.value !== 0) {
    return new Error(`Invalid Prop: "${propName}" supplied to "${componentName}".
      Value is not divisible by the grid size: ${size.value}
    `);
  }
}

export { boardDimension };
