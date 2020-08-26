import { useRef, useState, useCallback } from "react";
import { produce } from 'immer';

// * This implementation of Conway's Game of Life is provided as a hook called useConways
// * 
// * This hook returns several functions and variables, including:
// *    Seed patterns for empty grid, random grid, and 3 methuselah seeds,
// *    Controls for reading the grid, setting the grid, and setting individual cells,
// *    Functions to control stopping and stopping the game, as well as clearing the grid
// *    and informational functions, a boolean called isEvolving() and a generational counter

const useConways = ({ gridRows = 50, gridColumns = 50 }) => {

  // * Returns an empty 2d array
  const empty = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0));
    }
    return r;
  }
  
  // * returns a randomized 2d array
  const random = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => Math.random() < 1 / 5 ? 1 : 0));
    }
    return r;
  }
  
  // * Methuselah seeds rPentomino, acorn, and thunderbird
  // * 
  // *    Methuselah seeds have a lifespan that is much 
  // *    longer than their diminuitive seed state might imply

  const rPentomino = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[23][24] = 1;
    r[24][24] = 1;
    r[25][24] = 1;
    r[23][23] = 1;
    r[24][25] = 1;
    return r;
  }
  
  const acorn = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[23][22] = 1;
    r[24][24] = 1;
    r[25][21] = 1;
    r[25][22] = 1;
    r[25][25] = 1;
    r[25][26] = 1;
    r[25][27] = 1;
    return r;
  }
  
  const thunderbird = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[22][23] = 1;
    r[22][24] = 1;
    r[22][25] = 1;
    r[24][24] = 1;
    r[25][24] = 1;
    r[26][24] = 1;
    return r;
  }
  
  // * 
  // * Refs and State
  // * 

  const runningRef = useRef(false);

  let [generation, setGeneration] = useState(0)

  const [running, setrunning] = useState(false)

  const [buffer, setBuffer] = useState(() => {
    return empty();
  })

  const [grid, setGrid] = useState(buffer);


  // * 
  // * Sets individual cells in the buffer
  // * 
  const setCell = (r, c, value) => {
    setBuffer((g) => {
      return produce(g, draft => {
        draft[r][c] = value ? 1 : 0;
      });
    });
  }

  
  const isEvolving = () => {
    return running;
  }

  const start = () => {
    setrunning(true);
    runningRef.current = true;
    run();
  }
  
  const stop = () => {
    setrunning(false);
    runningRef.current = false;
  }

  const clear = () => {
    setBuffer(empty());
    setGrid(empty());
    setGeneration(0);
  }

  // * 
  // * nodeNeighbors returns an integer that represents the number of
  // * live neighbors a single cell has.
  // * 
  const nodeNeighbors = useCallback((g, r, c) => {
    let n = 0;
    const neighbors = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [0, 1],
      [-1, 1],
      [-1, 0],
      [-1, -1],
    ]

    neighbors.forEach(pair => {
      let newR = r + pair[0];
      let newC = c + pair[1];

      if (newR >= 0 && newR < gridRows && newC >= 0 && newC < gridColumns && g[newR][newC] == 1) {
        n += 1;
      }
    })
    return n;
  });


  // * 
  // * run() implements the ruls of life recursively
  // *    
  // *    The grid is set from a buffered state, 
  // *    then the buffer is set with the next state,
  // *    a generation is incremented,
  // *    and a timeout is implemented to evenly space the transitions
  // *

  const run = useCallback(() => {
    
    if (!runningRef.current) return;

    setGrid(buffer)
    
    setBuffer(g => produce(g, gCopy =>
      gCopy.forEach((row, r) =>
        row.forEach((_, c) => {
          let n = nodeNeighbors(g, r, c);           // *
            if (gCopy[r][c] == 0 && n == 3) {       // *  This algorithm implements the rules of GOL
              gCopy[r][c] = 1;                      // *    
            } else {                                // *    based on these rules, a cell will either be:
              if (n < 2 || n > 3) {                 // *        alive = 1
                gCopy[r][c] = 0                     // *        dead  = 0
              }
            }
          }
        )
      ))
    )
    
    setGeneration(++generation)
    setTimeout(run, 25);

  })


  return { 
    random,
    acorn,
    rPentomino,
    thunderbird,
    grid,
    setGrid,
    setCell,
    start,
    stop,
    clear,
    isEvolving,
    generation
  };
}

export default useConways; 