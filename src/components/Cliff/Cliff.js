import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './Cliff.css';

const Cliff = ({ center = false, children, className, ...other }) => {
  const _className = classnames(
    'Cliff',
    { 'Cliff--center': center },
    className
  );

  return (
    <div className={_className} {...other}>
      {children}
    </div>
  );
};

Cliff.propTypes = {
  center: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Cliff;
export { Cliff };
