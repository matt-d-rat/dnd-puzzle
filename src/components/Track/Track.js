import React from 'react';

import './Track.css';

const Track = ({ rotate = 0 }) => {
  const _style = {
    transform: `rotate(${rotate}deg)`
  };

  return <div className="Track" style={_style} />;
};

Track.propTypes = {
  rotate: function(props, propName, componentName) {
    const value = props[propName];

    if (value < 0 || value > 360) {
      return new Error(
        'Invalid prop `' +
          propName +
          '` supplied to' +
          ' `' +
          componentName +
          '`. Validation failed.'
      );
    }
  }
};

export default Track;
export { Track };
