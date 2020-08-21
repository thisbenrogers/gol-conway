import { useState, useCallback } from 'react';
import { produce as produceNext } from 'immer';

const useSpace = ({ gridRows = 50, gridColumns = 50, initializeGrid }) => {
  
  const emptyGrid = () => {
    let rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows.push(Array.from(new Array(gridColumns), () => 0));
    }
    return rows;
  }

  const randomGrid = () => {
    let rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows.push(Array.from(new Array(gridColumns), () => Math.random() < 1 / 2 ? 1 : 0));
    }
    return rows;
  }

  const rPentomino = () => {

  }

  const thunderbird = () => {

  }

  const acorn = () => {

  }

  const [grid, setGrid] = useState(() => {
    return emptyGrid();
  })


  const setCell = (r, c, value) => {
    setGrid((g) => {
      return produceNext(g, draft => {
        draft[r][c] = value ? 1 : 0;
      });
    });
  }

  const clearGrid = () => {
    setGrid(emptyGrid())
  }

  const countNeighbors = useCallback((g, r, c) => {
    let n = 0
    const neighbors = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
    neighbors.forEach(pair => {
      let newRow = r + pair[0];
      let newColumn = c + pair[1];
      if (newRow >= 0 && newRow < gridRows && newColumn >= 0 && newColumn < gridColumns && g[newRow][newColumn] == 1) {
        n += 1
      }
    })
    return n
  }, [gridColumns, gridRows]);


  return { grid, setGrid, setCell, clearGrid, countNeighbors }
}

export default useSpace;