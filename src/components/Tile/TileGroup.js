import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TileGroup = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

TileGroup.propTypes = {
  children: PropTypes.node,
};

export default TileGroup;
export { TileGroup };
