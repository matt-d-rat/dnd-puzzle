import React, { useState, useCallback, useReducer } from 'react';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

import AppContext from './AppContext';
import Board from '../Board';
import { Tile, TileGroup } from '../Tile';

import AntiMagicField from '../AntiMagicField';
import Leaver from '../Leaver';
import Track from '../Track';
import Chest from '../Chest';

import { ReactComponent as IconOrientation } from '../../images/icon-orientation.svg';
import { ReactComponent as IconEye } from '../../images/icon-eye.svg';

import './App.css';

const playerTokens = {
  alannia: {
    name: 'Allannia Hawklight',
    color: '#4CAF50',
    position: { col: 3, row: 24 },
    isRevealed: true,
    type: 'player',
  },
  blayd: {
    name: 'Blayd Piper',
    color: '#E91E63',
    position: { col: 3, row: 25 },
    isRevealed: true,
    type: 'player',
  },
  duckworth: {
    name: 'Duckworth Gloomstar',
    color: '#3F51B5',
    position: { col: 3, row: 26 },
    isRevealed: true,
    type: 'player',
  },
  komf: {
    name: "Komf Idgaf Grey'c",
    color: '#FFC107',
    position: { col: 2, row: 24 },
    isRevealed: true,
    type: 'player',
  },
  michael: {
    name: 'Michael Fullmourn',
    color: '#00BCD4',
    position: { col: 2, row: 25 },
    isRevealed: true,
    type: 'player',
  },
  nib: {
    name: 'Nibendobharchú',
    color: '#8BC34A',
    position: { col: 2, row: 26 },
    isRevealed: true,
    type: 'player',
  },
  rosemary: {
    name: 'Rosemary Pridethorn',
    color: '#9C27B0',
    position: { col: 1, row: 24 },
    isRevealed: true,
    type: 'player',
  },
  tor: {
    name: 'Tor Eldin',
    color: '#FF5722',
    position: { col: 1, row: 25 },
    isRevealed: true,
    type: 'player',
  },
};

const monsterTokens = {
  'magma-mephit-a': {
    name: 'Magma Mephit A',
    color: '#000',
    position: { col: 4, row: 12 },
    isRevealed: false,
    type: 'monster',
  },
  'magma-mephit-b': {
    name: 'Magma Mephit B',
    color: '#000',
    position: { col: 8, row: 17 },
    isRevealed: false,
    type: 'monster',
  },
  'magma-mephit-c': {
    name: 'Magma Mephit C',
    color: '#000',
    position: { col: 4, row: 21 },
    isRevealed: false,
    type: 'monster',
  },
  'magma-mephit-d': {
    name: 'Magma Mephit D',
    color: '#000',
    position: { col: 6, row: 4 },
    isRevealed: false,
    type: 'monster',
  },
};

const initialTokenState = {
  ...playerTokens,
  ...monsterTokens,
};

function tokenReducer(state, { type, payload }) {
  switch (type) {
    case 'move':
      return {
        ...state,
        [payload.tokenId]: {
          ...state[payload.tokenId],
          position: { col: payload.col, row: payload.row },
        },
      };

    case 'reveal':
      return {
        ...state,
        ...Object.keys(state)
          .filter((tokenId) => state[tokenId].type === payload.type)
          .reduce((acc, tokenId) => {
            return {
              ...acc,
              [tokenId]: {
                ...state[tokenId],
                isRevealed: payload.isRevealed,
              },
            };
          }, {}),
      };

    default:
      throw new Error();
  }
}

const App = () => {
  // State
  const [isLandscape, setIsLandscape] = useState(true);
  const [areMonstersRevealed, setAreMonstersRevealed] = useState(false);

  const [leaverA, setLeverA] = useState(false);
  const [leaverB, setLeverB] = useState(false);
  const [leaverC, setLeverC] = useState(false);
  const [leaverD, setLeverD] = useState(true);
  const [leaverDAttached, setAttachLeverD] = useState(false);

  const [rotateTrackX, setRotateTrackX] = useState(180);
  const [rotateTrackY, setRotateTrackY] = useState(90);
  const [rotateTrackZ, setRotateTrackZ] = useState(0);

  const [tokens, dispatch] = useReducer(tokenReducer, initialTokenState);
  const [isChestOpen, setIsChestOpen] = useState(false);

  // Handers
  const onInteractLeaverA = useCallback(() => {
    const leaverState = !leaverA;
    const rotation = leaverState ? 180 : -180;

    setLeverA(leaverState);
    setRotateTrackX(rotateTrackX + rotation);
    if (leaverC === false) {
      setRotateTrackY(rotateTrackY + rotation);
    }
    setRotateTrackZ(rotateTrackZ + rotation);
  }, [
    leaverA,
    setLeverA,
    leaverC,
    rotateTrackX,
    rotateTrackY,
    rotateTrackZ,
    setRotateTrackX,
    setRotateTrackY,
    setRotateTrackZ,
  ]);

  const onInteractLeaverB = useCallback(() => {
    const leaverState = !leaverB;
    const rotation = leaverState ? 90 : -90;

    setLeverB(leaverState);

    setRotateTrackX(rotateTrackX + rotation);
    if (leaverC === false) {
      setRotateTrackY(rotateTrackY + rotation);
    }
    setRotateTrackZ(rotateTrackZ + rotation);
  }, [
    leaverB,
    setLeverB,
    leaverC,
    rotateTrackX,
    rotateTrackY,
    rotateTrackZ,
    setRotateTrackX,
    setRotateTrackY,
    setRotateTrackZ,
  ]);

  const onInteractLeaverC = useCallback(() => {
    setLeverC(!leaverC);
  }, [leaverC, setLeverC]);

  const onInteractLeaverD = useCallback(
    (e) => {
      e.preventDefault();
      // Click + Shift = false
      if (!e.nativeEvent.shiftKey && leaverDAttached) {
        setLeverD(!leaverD);
      }
      // Click + Shift = true
      else if (e.nativeEvent.shiftKey) {
        setAttachLeverD(!leaverDAttached);
      }
    },
    [leaverD, setLeverD, leaverDAttached, setAttachLeverD]
  );

  const onToggleChest = useCallback(() => {
    setIsChestOpen(!isChestOpen);
  }, [isChestOpen, setIsChestOpen]);

  const onToggleOrientation = useCallback(() => {
    setIsLandscape(!isLandscape);
  }, [isLandscape, setIsLandscape]);

  const onToggleRevealMonsters = useCallback(
    ({ tokenType, isRevealed }) => {
      const revealedState = !areMonstersRevealed;

      setAreMonstersRevealed(revealedState);

      dispatch({
        type: 'reveal',
        payload: { type: 'monster', isRevealed: revealedState },
      });
    },
    [areMonstersRevealed, setAreMonstersRevealed, dispatch]
  );

  return (
    <div className="App">
      <AppContext.Provider value={{ isLandscape }}>
        <div className="App-controls">
          <IconOrientation className="App-icon" onClick={onToggleOrientation} />
          <IconEye className="App-icon" onClick={onToggleRevealMonsters} />
        </div>

        <DndProvider backend={Backend}>
          <Board width={500}>
            {/* Stone Platform (North) */}
            <TileGroup>
              <Tile
                col={0}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={0}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
                isBlocked
              >
                <Leaver
                  color="cyan"
                  hasLeaver={leaverDAttached}
                  onClick={onInteractLeaverD}
                  isPulled={leaverD}
                />
              </Tile>
              <Tile
                col={2}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={1}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={2}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
            </TileGroup>

            {/* Track (North) */}
            <TileGroup>
              <Tile
                col={0}
                row={3}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={3}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={3}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={3}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={3}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={3}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={3}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={3}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={3}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={3}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={4}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={4}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={4}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={4}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={4}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={4}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={4}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={4}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={4}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={4}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={5}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={5}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={5}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={5}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={5}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={5}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={5}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={5}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={5}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={5}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={6}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={6}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={6}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={6}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={6}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={6}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={6}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              >
                <Track rotate={rotateTrackX} />
              </Tile>
              <Tile
                col={7}
                row={6}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={6}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={6}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={7}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={7}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={7}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={7}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={7}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={7}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={7}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={7}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={7}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={7}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={8}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={8}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={8}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={8}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={8}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={8}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={8}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={8}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={8}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={8}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={9}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={9}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={9}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={9}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={9}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={9}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={9}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={9}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={9}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={9}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
            </TileGroup>

            {/* Platform (West) + Track (Center) */}
            <TileGroup>
              <Tile
                col={0}
                row={10}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={10}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={10}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={10}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={10}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={10}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={10}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={10}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={10}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={10}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={11}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={11}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={11}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={11}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={11}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={11}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={11}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={11}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={11}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={11}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={12}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={12}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={12}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={12}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={12}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={13}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile col={1} row={13} type="stone" isBlocked>
                <Chest isOpen={isChestOpen} onClick={onToggleChest} />
              </Tile>
              <Tile
                col={2}
                row={13}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={13}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={13}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={13}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={13}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              >
                <Track rotate={rotateTrackY} />
                <AntiMagicField isActive={leaverD} />
              </Tile>
              <Tile
                col={7}
                row={13}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={13}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={13}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={14}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={14}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={14}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={14}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={15}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={15}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={15}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={15}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={15}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={15}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={15}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={15}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={15}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={15}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={16}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={16}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={16}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={16}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={16}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={16}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={16}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={16}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={16}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={16}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
            </TileGroup>

            {/* Track (South) */}
            <TileGroup>
              <Tile
                col={0}
                row={17}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={17}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={17}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={17}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={17}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={17}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={17}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={17}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={17}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={17}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={18}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={18}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={18}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={18}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={18}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={18}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={18}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={18}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={18}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={18}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={19}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={19}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={19}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={19}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={19}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={19}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={19}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={19}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={19}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={19}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={20}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={20}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={20}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={20}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={20}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={20}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={20}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              >
                <Track rotate={rotateTrackZ} />
              </Tile>
              <Tile
                col={7}
                row={20}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={20}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={20}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={21}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={21}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={21}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={21}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={22}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={22}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={22}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={22}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={22}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={22}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={22}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={22}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={22}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={22}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>

              <Tile
                col={0}
                row={23}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={23}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={23}
                type="none"
                isBlocked
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={23}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={23}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={23}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={23}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={23}
                type="magma"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={23}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={9}
                row={23}
                type="lava"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
            </TileGroup>

            {/* Stone Platform (South) */}
            <TileGroup>
              <Tile
                col={0}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={24}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile col={9} row={24} type="stone" isBlocked>
                <Leaver
                  color="red"
                  onClick={onInteractLeaverA}
                  hasLeaver
                  isPulled={leaverA}
                />
              </Tile>

              <Tile
                col={0}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={25}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile col={9} row={25} type="stone" isBlocked>
                <Leaver
                  color="green"
                  onClick={onInteractLeaverB}
                  hasLeaver
                  isPulled={leaverB}
                />
              </Tile>

              <Tile
                col={0}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={1}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={2}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={3}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={4}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={5}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={6}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={7}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile
                col={8}
                row={26}
                type="stone"
                tokens={tokens}
                onDrop={dispatch}
              ></Tile>
              <Tile col={9} row={26} type="stone" isBlocked>
                <Leaver
                  color="yellow"
                  onClick={onInteractLeaverC}
                  hasLeaver
                  isPulled={leaverC}
                />
              </Tile>
            </TileGroup>
          </Board>
        </DndProvider>
      </AppContext.Provider>
    </div>
  );
};

export default App;
export { App };
