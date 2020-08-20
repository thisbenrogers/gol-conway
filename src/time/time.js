import { useRef, useState, useCallback } from 'react';
import { produce as produceNext } from 'immer';

const manageTime = ({ interval = 300 }) => {

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

  const runSimulation = useCallback({}, [])
  
  let generation = 0

  return { start, stop, isRunning, generation }
}

export default manageTime;