import React from 'react';
import './App.css';

import useSpace from './space/space';
import manageTime from './time/time';

function App() {
  const { start, stop, isRunning, generation } = manageTime({ interval : 250 })
  const { grid, setCell, clearGrid } = useSpace({ gridRows : 25,  gridColumns : 25 })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Conway's Game of Life</h1>
      </header>
      <body className="App-body">
        <div className="grid">
          <h2>grid</h2>
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
