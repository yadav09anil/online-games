import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import for navigation

const TicTacToe = () => {
  const navigate = useNavigate(); // hook for navigation

  const initialBoard = Array(3).fill(null).map(() => Array(3).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // X = Player, O = CPU
  const [winner, setWinner] = useState(null);

  const checkWinner = (newBoard) => {
    const lines = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (let [[a1, a2], [b1, b2], [c1, c2]] of lines) {
      if (
        newBoard[a1][a2] &&
        newBoard[a1][a2] === newBoard[b1][b2] &&
        newBoard[a1][a2] === newBoard[c1][c2]
      ) {
        return newBoard[a1][a2];
      }
    }

    return null;
  };

  const handleClick = (row, col) => {
    if (!isPlayerTurn || board[row][col] || winner) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const cpuMove = () => {
    const emptyCells = [];
    board.forEach((row, rIdx) => {
      row.forEach((cell, cIdx) => {
        if (!cell) emptyCells.push([rIdx, cIdx]);
      });
    });

    if (emptyCells.length === 0) return;

    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = board.map(row => [...row]);
    newBoard[r][c] = 'O';
    setBoard(newBoard);
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (board.flat().every(cell => cell)) {
      setWinner('Draw');
    } else if (!isPlayerTurn) {
      setTimeout(cpuMove, 500);
    }
  }, [board, isPlayerTurn]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setWinner(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  const status = winner
    ? winner === 'Draw'
      ? "It's a draw!"
      : `Winner: ${winner === 'X' ? 'You' : 'CPU'}`
    : isPlayerTurn
    ? "Your Turn (X)"
    : "CPU's Turn (O)";

  return (
    <div className="game">
      <h1>Tic Tac Toe (vs CPU)</h1>
      <div className="status">{status}</div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <button
                key={colIndex}
                className="square"
                onClick={() => handleClick(rowIndex, colIndex)}
                disabled={!!cell || !isPlayerTurn || winner}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="button-group">
  <button className="reset-button" onClick={resetGame}>🔁 Restart</button>
  <button className="home-button" onClick={goToHome}> 🏠 Go to Home</button>
</div>

    </div>
  );
};

export default TicTacToe;
