import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Tile.css';

const Tile = ({
  children,
  className,
  isBlocked = false,
  type = 'blank',
  ...other
}) => {
  const _className = classnames(
    'Tile',
    {
      [`Tile--${type}`]: type,
      'is-blocked': isBlocked,
    },
    className
  );

  return (
    <div className={_className} {...other}>
      {children}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isBlocked: PropTypes.bool,
  type: PropTypes.oneOf(['none', 'blank', 'stone', 'test']),
};

export default Tile;
export { Tile };
