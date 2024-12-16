import React, { useState } from 'react';
import './App.css';

function App() {
  // Step 1: Set up the game state
  const [currentPlayer, setCurrentPlayer] = useState('X'); // Current player ('X' or 'O')
  const [gameBoard, setGameBoard] = useState(Array(9).fill('')); // Game board (9 empty cells)
  const [message, setMessage] = useState("Player X's turn"); // Message for the user

  // Step 2: Handle cell clicks
  const handleCellClick = (index) => {
    // If the cell is already filled, do nothing
    if (gameBoard[index] !== '') return;

    // Update the game board with the current player's move
    const newGameBoard = [...gameBoard];
    newGameBoard[index] = currentPlayer;
    setGameBoard(newGameBoard);

    // Step 3: Check if someone won after this move
    if (checkWin(newGameBoard)) {
      setMessage(`Player ${currentPlayer} wins!`);
      return;
    }

    // Step 4: Check if the game is a draw
    if (newGameBoard.every(cell => cell !== '')) {
      setMessage("It's a draw!");
      return;
    }

    // Step 5: Switch to the next player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    setMessage(`Player ${currentPlayer === 'X' ? 'O' : 'X'}'s turn`);
  };

  // Step 6: Check if there's a winning combination
  const checkWin = (board) => {
    const winPatterns = [
      [0, 1, 2], // Row 1
      [3, 4, 5], // Row 2
      [6, 7, 8], // Row 3
      [0, 3, 6], // Column 1
      [1, 4, 7], // Column 2
      [2, 5, 8], // Column 3
      [0, 4, 8], // Diagonal 1
      [2, 4, 6], // Diagonal 2
    ];

    // Loop through each winning pattern to check if it's a winning combination
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
        return true; // Return true if a win is found
      }
    }

    return false; // No win found
  };

  // Step 7: Render the game board and message
  return (
    <div className="App">
      <div className="message">{message}</div>
      <div className="game-container">
        {gameBoard.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
