import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  const [winner, setWinner] = useState(null);

  let gameBoard = initialGameBoard;

  // derive gameBoard from state (turns) that is managed in App component
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
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

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((activePlayerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {activePlayerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
