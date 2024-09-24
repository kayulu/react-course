import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";

function deriveActivePlayer(prevTurns) {
  let currentPlayer = 'X';
  if(prevTurns.length > 0 && prevTurns[0].player === 'X')
    currentPlayer = 'O';

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ul>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  );  
}

export default App;
