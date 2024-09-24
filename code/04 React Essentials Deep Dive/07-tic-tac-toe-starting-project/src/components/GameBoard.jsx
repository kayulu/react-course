import { useState } from "react";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({onSelectSquare, activePlayerSymbol}) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner, setWinner] = useState(null);

  function handleButtonClick(rowIndex, colIndex) {

    // uses functional state update pattern
    setGameBoard((prevBoard) => {
      const newBoard = [...prevBoard];  // shallow copy of prevBoard, each row hold ref to inner arrays
      newBoard[rowIndex] = [...newBoard[rowIndex]]; // deep copy only of newBoard[rowIndex]
      newBoard[rowIndex][colIndex] = activePlayerSymbol;

      // this is another solution, it creates a deep copy of all the elements 
      // const newBoard = [...prevBoard.map(innerArray => [...innerArray])];
      // newBoard[rowIndex][colIndex] = activePlayerSymbol;

      checkWin(newBoard, rowIndex, colIndex); // check win works on the newly created array

      return newBoard;
    })

    onSelectSquare();
  }

  function checkWin(board, rowIndex, colIndex) {
    if (checkRowWin(board, rowIndex) || checkColWin(board, colIndex) || checkDiagonalWin(board)) {
      setWinner(activePlayerSymbol);
      console.log("Winner is: " + activePlayerSymbol);
    }
  }

  function checkRowWin(board, rowIndex) {
    let count = 0;
    for (const elem of board[rowIndex])
      elem === activePlayerSymbol ? count++ : null;

    if (count === 3) return true;

    return false;
  }

  function checkColWin(board, colIndex) {
    let count = 0;
    board.forEach((row) => {
      if (row[colIndex] == activePlayerSymbol) count++;
    });

    if (count === 3) return true;

    return false;
  }

  function checkDiagonalWin(board) {
    console.log(board);
    if (
      (board[0][0] === board[1][1] &&
        board[1][1] === board[2][2] &&
        board[0][0] !== null) ||
      (board[0][2] === board[1][1] &&
        board[1][1] === board[2][0] &&
        board[0][2] !== null)
    )
      return true;
    return false;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((activePlayerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleButtonClick(rowIndex, colIndex)}>
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
