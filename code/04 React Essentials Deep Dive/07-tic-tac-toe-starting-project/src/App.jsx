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

  // function checkWin(board, rowIndex, colIndex) {
  //   if (
  //     checkRowWin(board, rowIndex) ||
  //     checkColWin(board, colIndex) ||
  //     checkDiagonalWin(board)
  //   ) {
  //     setWinner(activePlayerSymbol);
  //     console.log("Winner is: " + activePlayerSymbol);
  //   }
  // }

  // function checkRowWin(board, rowIndex) {
  //   let count = 0;
  //   for (const elem of board[rowIndex])
  //     elem === activePlayerSymbol ? count++ : null;

  //   if (count === 3) return true;

  //   return false;
  // }

  // function checkColWin(board, colIndex) {
  //   let count = 0;
  //   board.forEach((row) => {
  //     if (row[colIndex] == activePlayerSymbol) count++;
  //   });

  //   if (count === 3) return true;

  //   return false;
  // }

  // function checkDiagonalWin(board) {
  //   console.log(board);
  //   if (
  //     (board[0][0] === board[1][1] &&
  //       board[1][1] === board[2][2] &&
  //       board[0][0] !== null) ||
  //     (board[0][2] === board[1][1] &&
  //       board[1][1] === board[2][0] &&
  //       board[0][2] !== null)
  //   )
  //     return true;
  //   return false;
  // }

export default function App() {
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
