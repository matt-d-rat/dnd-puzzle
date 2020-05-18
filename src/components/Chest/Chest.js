import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AppContext from '../App/AppContext';

import './Chest.css';

const Chest = ({ disabled = false, isOpen = false, onClick, ...other }) => {
  // Context
  const { isLandscape } = useContext(AppContext);

  const _className = classnames('Chest', {
    'is-open': isOpen,
    'is-landscape': isLandscape,
  });

  return (
    <button
      className={_className}
      disabled={disabled}
      onClick={onClick}
      {...other}
    />
  );
};

Chest.propTypes = {
  disabled: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Chest;
export { Chest };
