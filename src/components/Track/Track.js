import React from 'react';
import PropTypes from 'prop-types';

import './Track.css';

const Track = ({ rotate = 0 }) => {
  const _style = {
    transform: `rotate(${rotate}deg)`,
  };

  return <div className="Track" style={_style} />;
};

Track.propTypes = {
  rotate: PropTypes.number,
};

export default Track;
export { Track };
