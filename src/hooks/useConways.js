import { useRef, useState, useCallback } from "react";
import { produce } from 'immer';

// This implementation of Conway's Game of Life is provided as a hook called useConways
// This hook returns several functions and variables, including:
//    Seed patterns for empty grid, random grid, and 3 methuselah seeds,
//    Controls for reading the grid, setting the grid, and setting individual cells,
//    Functions to control stopping and stopping the game, as well as clearing the grid
//    and informational functions, a boolean called isEvolving() and a generational counter

const useConways = ({ gridRows = 50, gridColumns = 50 }) => {

  // Returns an empty 2d array
  const empty = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0));
    }
    return r;
  }
  
  // returns a randomized 2d array
  const random = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => Math.random() < 1 / 5 ? 1 : 0));
    }
    return r;
  }
  
  // Methuselah seeds rPentomino, acorn, and thunderbird
  // 
  //    Methuselah seeds have a lifespan that is much 
  //    longer than their diminuitive seed state might imply

  const rPentomino = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[19][20] = 1;
    r[20][20] = 1;
    r[21][20] = 1;
    r[19][19] = 1;
    r[20][21] = 1;
    return r;
  }
  
  const acorn = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[19][18] = 1;
    r[20][20] = 1;
    r[21][17] = 1;
    r[21][18] = 1;
    r[21][21] = 1;
    r[21][22] = 1;
    r[21][23] = 1;
    return r;
  }
  
  const thunderbird = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[18][19] = 1;
    r[18][20] = 1;
    r[18][21] = 1;
    r[20][20] = 1;
    r[21][20] = 1;
    r[22][20] = 1;
    return r;
  }
  
  // 
  // Refs and State
  // 

  const runningRef = useRef(false);

  let [generation, setGeneration] = useState(0)

  const [running, setrunning] = useState(false)

  const [grid, setGrid] = useState(() => {
    return empty();
  });

  const [rate, setRate] = useState(25)



  // 
  // Sets individual cells on the grid 
  //
  const setCell = (r, c, value) => {
    setGrid((g) => {
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
    setGrid(empty());
    setGeneration(0);
  }

  // 
  // nodeNeighbors returns an integer that represents the number of
  // live neighbors a single cell has.
  // 
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

      if (newR >= 0 && newR < gridRows && newC >= 0 && newC < gridColumns && g[newR][newC] === 1) {
        n += 1;
      }
    })
    return n;
  }, [gridRows, gridColumns]);


  // the run() function runs through each cell of the grid,
  // determines the number "n" of neighbors by using nodeNeighbors(),
  // applies the rules of GOL,
  // increments a generational counter,
  // and recursively starts again based on a timeout()

  const run = useCallback(() => {
    
    if (!runningRef.current) return;

    setGrid(g => produce(g, gCopy =>
      gCopy.forEach((row, r) =>
        row.forEach((_, c) => {
          let n = nodeNeighbors(g, r, c);
            if (gCopy[r][c] === 0 && n === 3) {
              gCopy[r][c] = 1;                    
            } else {                                
              if (n < 2 || n > 3) {               
                gCopy[r][c] = 0                   
              }
            }
          }
        )
      ))
    )
    setGeneration(++generation)
    setTimeout(run, () => rate);

  }, [runningRef, nodeNeighbors, generation])

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
    generation,
    rate,
    setRate
  };
}

export default useConways; 