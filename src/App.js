import React from 'react';
import './App.css';

import useConways from './gol';

function App() {
  const { random, acorn, rPentomino, thunderbird, grid, setGrid, setCell, start, stop, evolving, clear, generation } = useConways({ gridRows : 50,  gridColumns : 50 })

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
            }}>{evolving() ? 'Clear' : "Clear"}</button>
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
            <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
          </ol>
          <h2 className="rules">This Implementation:</h2>
          <p className="implementation">
            This version of Conway's GOL was created by Ben Rogers.
            He made it in React as a hook.
            The Data-Structure is currently a 2-dimensional Array.
            Double-buffering is used, and a hashlife implementation is in the works.
          </p>
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
