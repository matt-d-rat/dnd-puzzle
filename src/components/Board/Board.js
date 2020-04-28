import React, { useContext } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import units from 'units-css';
import isNil from 'lodash.isnil';

import './Board.css';

import { boardDimension } from './propTypes';
import GridContext from './GridContext';

const Board = ({
  children,
  className,
  height,
  width,
  style = {},
  ...other
}) => {
  // Context
  const { size } = useContext(GridContext);

  const _width = !isNil(width) ? units.parse(width, 'width') : null;
  const _height = !isNil(height) ? units.parse(height, 'height') : null;
  const totalCols = !isNil(_width) ? _width.value / size.value : 1;
  const totalRows = !isNil(_height) ? _height.value / size.value : 1;

  // Rendering
  const _className = classnames('Board', className);

  const _style = {
    ...(height && {
      height: `${_height.value}${_height.unit}`,
      gridTemplateRows: `${size.value}${size.unit} `.repeat(totalRows).trim(),
    }),
    ...(width && {
      width: `${_width.value}${_width.unit}`,
      gridTemplateColumns: `${size.value}${size.unit} `
        .repeat(totalCols)
        .trim(),
    }),
    ...style,
  };

  return (
    <GridContext.Provider value={{ size, width: _width, height: _height }}>
      <div className={_className} style={_style} {...other}>
        {children}
      </div>
    </GridContext.Provider>
  );
};

Board.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: boardDimension,
  width: boardDimension,
};

export default Board;
export { Board };
