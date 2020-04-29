import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';

import AppContext from '../App/AppContext';
import ItemTypes from '../../constants/itemTypes';

import './Token.css';

const Token = ({
  children,
  className,
  color = '#ff0000',
  id,
  style,
  ...other
}) => {
  // Context
  const { isLandscape } = useContext(AppContext);

  // State
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: ItemTypes.TOKEN,
      tokenId: id,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      tokenId: id,
    }),
  });

  const _className = classnames(
    'Token',
    {
      'is-landscape': isLandscape,
      'is-dragging': isDragging,
    },
    className
  );

  const _style = { backgroundColor: color, ...style };

  return (
    <div
      ref={dragRef}
      key={`token-${id}`}
      className={_className}
      style={_style}
      {...other}
    >
      {children}
    </div>
  );
};

Token.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default Token;
export { Token };
