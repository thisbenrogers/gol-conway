import React from 'react';
import './App.css';

import useSpace from './space/space';
import useTime from './time/time';

function App() {
  const { start, stop, isRunning, generation } = useTime({ interval : 250 })
  const { grid, setCell, clearGrid } = useSpace({ gridRows : 25,  gridColumns : 25 })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <body className="App-body">
        <div className="grid">
          {
            grid.map((row, r) =>
              row.map((col, c) =>
                <div key={`${r}-${c}`} 
                    style={{
                      border: '1px solid black',
                      backgroundColor: grid[r][c] ? 'black' : undefined
                    }}
                    onClick={() => {
                      setCell(r, c, !grid[r][c]);
                    }}
                />
              )
            )
          }
        </div>
        <button onClick={() => { 
          if(isRunning()){
            stop() ; 
          }
          else{
            start() ; 
          }
        }}>{isRunning()? 'Stop' : 'Start'}</button>
        <button disabled={isRunning()} onClick={() => {
          if(!isRunning()){
            clearGrid()
          }
        }}>{isRunning() ? '...' : "Clear"}</button>
      </body>
    </div>
  );
}

export default App;
