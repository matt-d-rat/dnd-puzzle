import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import './AntiMagicField.css';

const AntiMagicField = ({ className, isActive = true, ...other }) => {
  const _className = classnames(
    'AntiMagicField',
    { 'is-active': isActive },
    className
  );

  return <div className={_className} {...other} />;
};

AntiMagicField.propTypes = {
  isActive: PropTypes.bool,
  className: PropTypes.string,
};

export default AntiMagicField;
export { AntiMagicField };
