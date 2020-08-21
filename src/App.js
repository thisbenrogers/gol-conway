import React from 'react';
import './App.css';

import useConways from './gol';

function App() {
  const { grid, setCell, start, stop, evolving, clear, generation } = useConways({ gridRows : 25,  gridColumns : 25 })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <div className="App-body">
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
          if(evolving()){
            stop() 
          }
          else{
            start()
          }
        }}>{evolving()? 'Stop' : 'Start'}</button>
        <button disabled={evolving()} onClick={() => {
          if(!evolving()){
            clear()
          }
        }}>{evolving() ? '...' : "Clear"}</button>
        <h3>Generation: {generation}</h3>
      </div>
    </div>
  );
}

export default App;
