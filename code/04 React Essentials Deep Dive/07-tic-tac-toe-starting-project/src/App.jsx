import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";

import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function updateGameboard(gameTurns) {
  let board = INITIAL_GAMEBOARD.map(row => [...row]);

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
  const [players, setPlayers] = useState(PLAYERS);
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

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }

  return (
    <main>
      <div id="game-container">
        <ul id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ul>
        {(winner || hasDraw) && <GameOver winner={players[winner]} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
