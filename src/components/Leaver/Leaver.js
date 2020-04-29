import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import AppContext from '../App/AppContext';

import './Leaver.css';

const Leaver = ({
  className,
  color = 'red',
  hasLeaver = true,
  isPulled = false,
  onClick,
}) => {
  // Context
  const { isLandscape } = useContext(AppContext);

  const _className = classnames(
    'Leaver',
    {
      [`Leaver--${color}`]: Boolean(color),
      'has-leaver': hasLeaver,
      'is-landscape': isLandscape,
      'is-pulled': isPulled,
    },
    className
  );

  return <button className={_className} onClick={onClick} />;
};

Leaver.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['red', 'green', 'yellow', 'cyan']),
  hasLeaver: PropTypes.bool,
  isPulled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Leaver;
export { Leaver };
