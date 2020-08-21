import { useRef, useState, useCallback } from 'react';
import { produce as produceNext } from 'immer';

import useSpace from '../space/space';

const useTime = ({ interval = 300 }) => {

  const { setGrid, countNeighbors } = useSpace({ gridRows : 25, gridColumns : 25 })

  const runningRef = useRef(false)

  const [running, setRunning] = useState(false)

  const isRunning = () => {
    return running
  }
  
  const start = () => {
    setRunning(true)
    runningRef.current = true
    runSimulation()
  }

  const stop = () => {
    setRunning(false)
    runningRef.current = false
  }

  let generation = 0

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid(g => produceNext(g, gCopy =>
      gCopy.forEach((row, r) =>
        row.forEach((_col, c) => {
          let n = countNeighbors(g, r, c);
          if (gCopy[r][c] == 0 && n == 3) {
            gCopy[r][c] = 1;
          } else {
            if (n < 2 || n > 3) gCopy[r][c] = 0;
          }
        })
      )))
      setTimeout(runSimulation, interval)
  }, [countNeighbors, interval, setGrid])
  

  return { start, stop, isRunning, generation }
}

export default useTime;