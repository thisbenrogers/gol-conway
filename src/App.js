import React, { useState } from 'react';

import './App.css';

import useConways from './hooks/useConways';

function App() {

  const [rwClm, setRwClm] = useState(39);

  const { 
    random,
    acorn,
    rPentomino,
    thunderbird,
    grid,
    setGrid,
    setCell,
    start,
    stop,
    isEvolving,
    clear,
    generation
  } = useConways({ gridRows : rwClm,  gridColumns : rwClm })

  return (
    <div className="App">
      <div className="App-body">
        <div className="controls-container">
          <label htmlFor="about">About Game of Life:</label>
          <p name="about" className="about">
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">The Game of Life</a> is a cellular automaton devised by 
            John Horton Conway. It is a zero-player game, meaning that its evolution 
            is determined by its initial state.
          </p>
          <label htmlFor="rules">Rules:</label>
          <ol name="rules" className="rules">
            <li>Any live cell with two or three live neighbours survives.</li>
            <li>Any dead cell with three live neighbours becomes a live cell.</li>
            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
          </ol>
          <hr />
          <label htmlFor="meth">Seed</label>
          <div name='meth' className="methuselah-container button-container">
            <button onClick={() => {
              clear()
              setGrid(random())
            }}>Random</button>
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
          </div>
          <small>(or select nodes in the grid to initialize manually)</small>
          <hr />
          <label htmlFor="play">Play!</label>
          <div name='play' className="main-controls button-container">
            <button onClick={() => { 
              if(isEvolving()){
                stop() 
              }
              else{
                start()
              }
            }}>{isEvolving()? 'Stop' : 'Start'}</button>
            <button disabled={isEvolving()} onClick={() => {
              if(!isEvolving()){
                clear()
              }
            }}>{isEvolving() ? 'Clear' : 'Clear'}</button>
          </div>

          <h3>Generation: {generation}</h3>
        </div>
        <div className="grid-container">
          <div className="grid">
            {
              grid.map((row, r) =>
                row.map((_, c) =>
                  <div key={`${r}-${c}`}
                      style={{
                        border: isEvolving() ? '1px solid white' : '1px solid aliceblue' ,
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
