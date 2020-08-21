import React from 'react';
import './App.css';

import useConways from './gol';

function App() {
  const { acorn, rPentomino, thunderbird, grid, setGrid, setCell, start, stop, evolving, clear, generation } = useConways({ gridRows : 50,  gridColumns : 50 })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <div className="App-body">
        <div className="controls-container">
          <h2 className="rules">About Game of Life:</h2>
          <h2 className="rules">Rules:</h2>
          <h2 className="rules">This Implementation:</h2>
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
          }}>{evolving() ? 'disabled' : "Clear"}</button>
          <button onClick={() => {
            clear()
            setGrid(acorn())
          }}>Acorn</button>
          <button onClick={() => {
            clear()
            setGrid(rPentomino())
          }}>rPentomino</button>
          <button onClick={() => {
            clear()
            setGrid(thunderbird())
          }}>Thunderbird</button>
          <h3>Generation: {generation}</h3>
        </div>
        <div className="grid-container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
