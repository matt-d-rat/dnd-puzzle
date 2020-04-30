import React, { useContext, useState, useCallback } from 'react';
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
  isHidden = false,
  isRevealed = true,
  style,
  ...other
}) => {
  // Context
  const { isLandscape } = useContext(AppContext);

  // State
  const [isTokenHidden, setIsTokenHidden] = useState(isHidden);

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

  // Handlers
  const onToggleHiding = useCallback(
    (e) => {
      if (e.nativeEvent.shiftKey) {
        setIsTokenHidden(!isTokenHidden);
      }
    },
    [isTokenHidden, setIsTokenHidden]
  );

  const _className = classnames(
    'Token',
    {
      'is-landscape': isLandscape,
      'is-dragging': isDragging,
      'is-hidden': isTokenHidden,
      'is-revealed': isRevealed,
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
      onClick={onToggleHiding}
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
  isHidden: PropTypes.bool,
  isRevealed: PropTypes.bool,
  style: PropTypes.object,
};

export default Token;
export { Token };
