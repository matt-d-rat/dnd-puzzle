import React, { useState, useCallback } from 'react';
import './App.css';

import Cliff from '../Cliff';
import Grid from '../Grid';
import Track from '../Track';
import Leaver from '../Leaver';
import Chest from '../Chest';
import Token from '../Token';

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
  const gridSmall = {
    height: '150px',
    width: '150px',
    flex: 'auto',
  };

  return (
    <div className="App">
      <div className="App-row">
        <Grid>
          <Cliff />
        </Grid>
      </div>

      <div className="App-row">
        <Grid>
          <Track rotate={rotateTrackX} />
        </Grid>
      </div>

      <div className="App-row">
        <Grid style={gridSmall}>
          <Cliff center>
            <Chest isOpen={isChestOpen} onClick={onToggleChest} />
          </Cliff>
        </Grid>
        <Grid>
          <Track rotate={rotateTrackY} />
        </Grid>
      </div>

      <div className="App-row">
        <Grid>
          <Track rotate={rotateTrackZ} />
        </Grid>
      </div>

      <div className="App-row">
        <Grid>
          <Cliff>
            <Leaver color="red" isPulled={leaverA} onClick={onPullLeaverA} />
            <Leaver color="green" isPulled={leaverB} onClick={onPullLeaverB} />
            <Leaver color="yellow" isPulled={leaverC} onClick={onPullLeaverC} />
          </Cliff>
        </Grid>
      </div>

      <Token color="red" title="Alannia">
        A
      </Token>
    </div>
  );
};

export default App;
export { App };
