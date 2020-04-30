import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import findKey from 'lodash.findkey';

import ItemTypes from '../../constants/itemTypes';

import Token from '../Token';

import './Tile.css';

const Tile = ({
  children,
  col,
  className,
  isBlocked = false,
  onDrop = () => {},
  row,
  tokens = {},
  type = 'blank',
  ...other
}) => {
  const tokenId = findKey(tokens, { position: { row, col } });
  const hasToken = Boolean(tokenId);
  const token = tokens[tokenId];

  // State
  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: ItemTypes.TOKEN,
    canDrop: () => !isBlocked && !hasToken,
    drop: (item) => {
      onDrop({
        type: 'move',
        payload: {
          tokenId: item.tokenId,
          row,
          col,
        },
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  const _className = classnames(
    'Tile',
    {
      [`Tile--${type}`]: type,
      'is-over': isOver && canDrop,
      'is-blocked': isBlocked,
    },
    className
  );

  return (
    <div ref={dropRef} className={_className} {...other}>
      {children}
      {hasToken && (
        <Token
          id={tokenId}
          color={token.color}
          title={token.name}
          isRevealed={token.isRevealed}
        >
          {token.name
            .split(' ')
            .map((n, i, a) => (i === 0 || i + 1 === a.length ? n[0] : null))
            .join('')}
        </Token>
      )}
    </div>
  );
};

Tile.propTypes = {
  children: PropTypes.node,
  col: PropTypes.number.isRequired,
  className: PropTypes.string,
  isBlocked: PropTypes.bool,
  onDrop: PropTypes.func,
  row: PropTypes.number.isRequired,
  tokens: PropTypes.object,
  type: PropTypes.oneOf(['none', 'blank', 'stone', 'lava', 'magma', 'test']),
};

export default Tile;
export { Tile };
