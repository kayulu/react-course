import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function updateGameboard(gameTurns) {
  let board = initialGameBoard.map(row => [...row]);

  // derive gameBoard from state (turns) that is managed in App component
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    board[row][col] = player;
  }

  return board;
}

function deriveActivePlayer(prevTurns) {
  let currentPlayer = "X";
  if (prevTurns.length > 0 && prevTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function checkWin(board) {
  let winner = null;

  for (const comb of WINNING_COMBINATIONS) {
    let [comb1, comb2, comb3] = comb;
    let comb_1_symbol = board[comb1.row][comb1.col];
    let comb_2_symbol = board[comb2.row][comb2.col];
    let comb_3_symbol = board[comb3.row][comb3.col];

    if (
      comb_1_symbol &&
      comb_1_symbol === comb_2_symbol &&
      comb_2_symbol === comb_3_symbol
    )
      winner = comb_1_symbol;
  }

  return winner;
}

export default function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let board = updateGameboard(gameTurns);

  let winner = checkWin(board);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ul>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
