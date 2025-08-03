// MinesGame.js
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";

const GRID_SIZE = 5;

class MinesGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      gameOver: false,
      revealedCount: 0,
      statusMessage: "",
      numMines: 5,
    };
  }

  componentDidMount() {
    this.generateGrid();
  }

  generateGrid = () => {
    const { numMines } = this.state;

    const newGrid = Array(GRID_SIZE * GRID_SIZE)
      .fill(null)
      .map(() => ({ isMine: false, revealed: false }));

    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const index = Math.floor(Math.random() * newGrid.length);
      if (!newGrid[index].isMine) {
        newGrid[index].isMine = true;
        minesPlaced++;
      }
    }

    this.setState({
      grid: newGrid,
      gameOver: false,
      revealedCount: 0,
      statusMessage: "",
    });
  };

  handleClick = (index) => {
    const { grid, gameOver, revealedCount, numMines } = this.state;
    if (gameOver || grid[index].revealed) return;

    const newGrid = [...grid];
    newGrid[index] = { ...newGrid[index], revealed: true };

    if (newGrid[index].isMine) {
      this.setState({
        grid: newGrid,
        gameOver: true,
        statusMessage: "💥 Game Over! You hit a mine.",
      });
    } else {
      const newRevealedCount = revealedCount + 1;
      const totalSafeCells = GRID_SIZE * GRID_SIZE - numMines;

      this.setState(
        {
          grid: newGrid,
          revealedCount: newRevealedCount,
        },
        () => {
          if (newRevealedCount === totalSafeCells) {
            this.setState({
              gameOver: true,
              statusMessage: "🎉 You Win! All safe cells revealed.",
            });
          }
        }
      );
    }
  };

  handleMineChange = (e) => {
    const value = parseInt(e.target.value);
    this.setState({ numMines: value }, this.generateGrid);
  };

  render() {
    const { grid, statusMessage, numMines } = this.state;

    return (
      <div className="mines-container">
        <h2>💣 Mines Game</h2>

        <div className="mine-settings">
          <label htmlFor="mineCount">Number of Mines: {numMines}</label>
          <input
            type="range"
            id="mineCount"
            min="1"
            max="24"
            value={numMines}
            onChange={this.handleMineChange}
          />
        </div>

        

        <div className="status-message">{statusMessage}</div>

        <div className="grid">
          {grid.map((cell, index) => (
            <div
              key={index}
              className={`cell ${
                cell.revealed ? (cell.isMine ? "mine" : "safe") : ""
              }`}
              onClick={() => this.handleClick(index)}
            >
              {cell.revealed ? (cell.isMine ? "💣" : "💎") : ""}
            </div>
          ))}
        </div>

        <div className="button-group">
          <button onClick={this.generateGrid} className="reset-button">
            🔁 Restart
          </button>
          <button onClick={() => this.props.navigate('/')} className="home-button">
            🏠 Go to Home
          </button>
        </div>
      </div>



    );
  }
}

// Wrapper for navigation
const MinesGameWithNavigation = () => {
  const navigate = useNavigate();
  return <MinesGame navigate={navigate} />;
};

export default MinesGameWithNavigation;
