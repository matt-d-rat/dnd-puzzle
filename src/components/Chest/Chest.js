import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Chest.css';

const Chest = ({ isOpen = false, onClick, ...other }) => {
  const _className = classnames('Chest', { 'is-open': isOpen });

  return <button className={_className} onClick={onClick} {...other} />;
};

Chest.propTypes = {
  isOpen: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Chest;
export { Chest };