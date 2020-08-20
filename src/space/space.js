import { useRef, useState, useCallback } from 'react';
import { produce as produceNext } from 'immer';

const manageSpace = ({ gridRows = 50, gridColumns = 50, initialGrid = 'emptyGrid()' }) => {

  const [grid, setGrid] = useState(() => {
    return initialGrid
  })
  
  const emptyGrid = () => {

  }

  const randomGrid = () => {

  }

  const rPentomino = () => {

  }

  const thunderbird = () => {

  }

  const acorn = () => {

  }


  const setCell = () => {

  }

  const clearGrid = () => {
    setGrid(emptyGrid())
  }

  const countNeighbors = () => {
    
  }


  return { grid, setCell, clearGrid }
}

export default manageSpace;