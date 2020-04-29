import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AppContext from '../App/AppContext';

import './Chest.css';

const Chest = ({ isOpen = false, onClick, ...other }) => {
  // Context
  const { isLandscape } = useContext(AppContext);

  const _className = classnames('Chest', {
    'is-open': isOpen,
    'is-landscape': isLandscape,
  });

  return <button className={_className} onClick={onClick} {...other} />;
};

Chest.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Chest;
export { Chest };
