import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Grid.css';

const Grid = ({ children, className, ...other }) => {
  const _className = classnames('Grid', className);

  return (
    <div className={_className} {...other}>
      {children}
    </div>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Grid;
export { Grid };
