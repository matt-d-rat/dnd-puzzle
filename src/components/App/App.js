import React, { useState, useCallback } from 'react';
import './App.css';

import Board from '../Board';
import { Tile, TileGroup } from '../Tile';
import Leaver from '../Leaver';

// import Cliff from '../Cliff';
// import Grid from '../Grid';
// import Track from '../Track';

import Chest from '../Chest';
// import Token from '../Token';

const App = () => {
  // State
  const [leaverA, setLeverA] = useState(false);
  const [leaverB, setLeverB] = useState(false);
  const [leaverC, setLeverC] = useState(false);

  const [rotateTrackX, setRotateTrackX] = useState(180);
  const [rotateTrackY, setRotateTrackY] = useState(90);
  const [rotateTrackZ, setRotateTrackZ] = useState(0);

  const [isChestOpen, setIsChestOpen] = useState(false);

  // Handers
  const onPullLeaverA = useCallback(() => {
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

  const onPullLeaverB = useCallback(() => {
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

  const onPullLeaverC = useCallback(() => {
    setLeverC(!leaverC);
  }, [leaverC, setLeverC]);

  const onToggleChest = useCallback(() => {
    setIsChestOpen(!isChestOpen);
  }, [isChestOpen, setIsChestOpen]);

  // Rendering vars

  return (
    <div className="App">
      <Board width={500}>
        {/* Dtone Platform (North) */}
        <TileGroup>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
        </TileGroup>

        {/* Blank + Track (North) */}
        <TileGroup>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
        </TileGroup>

        {/* Platform (West) + Track (Center) */}
        <TileGroup>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone">
            <Chest isOpen={isChestOpen} onClick={onToggleChest} />
          </Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
        </TileGroup>

        {/* Blank + Track (South) */}
        <TileGroup>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>

          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="none" isBlocked></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
          <Tile type="blank"></Tile>
        </TileGroup>

        {/* Stone Platform (South) */}
        <TileGroup>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone">
            <Leaver color="red" onClick={onPullLeaverA} isPulled={leaverA} />
          </Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone">
            <Leaver color="green" onClick={onPullLeaverB} isPulled={leaverB} />
          </Tile>

          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone"></Tile>
          <Tile type="stone">
            <Leaver color="yellow" onClick={onPullLeaverC} isPulled={leaverC} />
          </Tile>
        </TileGroup>
      </Board>
    </div>
  );
};

export default App;
export { App };
