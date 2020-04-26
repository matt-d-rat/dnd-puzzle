import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Leaver.css';

const Leaver = ({ className, color = 'red', isPulled = false, onClick }) => {
  const _className = classnames(
    'Leaver',
    {
      [`Leaver--${color}`]: Boolean(color),
      'is-pulled': isPulled,
    },
    className
  );

  return <button className={_className} onClick={onClick} />;
};

Leaver.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['red', 'green', 'yellow']),
  isPulled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Leaver;
export { Leaver };
