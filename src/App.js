import React, { useState } from 'react';

import './App.css';

import useConways from './hooks/useConways';

function App() {

  const [rwClm, setRwClm] = useState(50);

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
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <div className="App-body">
        <div className="controls-container">
          <label htmlFor="play">Play the Game!</label>
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
            }}>{isEvolving() ? 'Clear' : "Clear"}</button>
          </div>
          <label htmlFor="random">Randomize the grid</label>
          <div name='random' className="random-containter button-container">
            <button onClick={() => {
              clear()
              setGrid(random())
            }}>Random</button>
          </div>
          <label htmlFor="meth">Seed the grid with one of my favorite methuselahs</label>
          <div name='meth' className="methuselah-container button-container">
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
          <h3>Generation: {generation}</h3>
          <h2 className="rules">About Game of Life:</h2>
          <p className="about">
            <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">The Game of Life</a> is a cellular automaton devised by the British mathematician 
            John Horton Conway in 1970. It is a zero-player game, meaning that its evolution 
            is determined by its initial state, requiring no further input.
            One interacts with the Game of Life by creating an initial configuration and 
            observing how it evolves.
          </p>
          <h2 className="rules">Rules:</h2>
          <ol className="rules">
            <li>Any live cell with two or three live neighbours survives.</li>
            <li>Any dead cell with three live neighbours becomes a live cell.</li>
            <li>All other live cells die in the next generation.</li> 
            <li>Similarly, all other dead cells stay dead.</li>
          </ol>
          <h2 className="rules">This Implementation:</h2>
          <p className="implementation">
            This version of Conway's GOL was created by Ben Rogers.
            He made it in React as a hook.
            The Data-Structure is currently a 2-dimensional Array.
            You can find the source <a href="https://github.com/thisbenrogers/gol-conway">here</a>
          </p>
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
