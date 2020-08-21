import { useRef, useState, useCallback } from "react";
import { produce } from 'immer';

const useConways = ({ gridRows = 25, gridColumns = 25 }) => {

  let [generation, setGeneration] = useState(0)

  const empty = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0));
    }
    return r;
  }

  const random = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => Math.random() < 1 / 2 ? 1 : 0));
    }
    return r;
  }

  const rPentomino = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[11][12] = 1;
    r[12][12] = 1;
    r[13][12] = 1;
    r[11][11] = 1;
    r[12][13] = 1;
    return r;
  }

  const acorn = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[11][10] = 1;
    r[12][12] = 1;
    r[13][9] = 1;
    r[13][10] = 1;
    r[13][13] = 1;
    r[13][14] = 1;
    r[13][15] = 1;
    return r;
  }

  const thunderbird = () => {
    let r = []
    for (let i = 0; i < gridRows; i++) {
      r.push(Array.from(new Array(gridColumns), () => 0))
    }
    r[10][11] = 1;
    r[10][12] = 1;
    r[10][13] = 1;
    r[12][12] = 1;
    r[13][12] = 1;
    r[14][12] = 1;
    return r;
  }



  const runningRef = useRef(false);

  const [running, setrunning] = useState(false)


  const [grid, setGrid] = useState(() => {
    return empty();
  });



  const setCell = (r, c, value) => {
    setGrid((g) => {
      return produce(g, draft => {
        draft[r][c] = value ? 1 : 0;
      });
    });
  }
  const evolving = () => {
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
    setGeneration(0)
  }

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
  }, []);


  const run = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(g => produce(g, gCopy =>
      gCopy.forEach((row, r) =>
        row.forEach((_col, c) => {

          let n = nodeNeighbors(g, r, c);

          if (gCopy[r][c] == 0 && n == 3) {
            gCopy[r][c] = 1;
          }
          else {
            if (n < 2 || n > 3) gCopy[r][c] = 0;
          }
        })
      )))
      setGeneration(++generation)
    setTimeout(run, 300);

  }, [generation, nodeNeighbors])


  return { grid, setCell, start, stop, evolving, clear, generation };
}

export default useConways; 