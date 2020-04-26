import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Token.css';

const Token = ({ children, className, color, style, ...other }) => {
  const _className = classnames('Token', className);
  const _style = { backgroundColor: color, ...style };

  return (
    <div className={_className} style={_style} {...other}>
      {children}
    </div>
  );
};

Token.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Token;
export { Token };
