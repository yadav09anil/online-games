import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const games = [
  {
    name: 'Mines',
    image: '/images/mines.jpg',
    path: '/mines',
  },
  {
    name: 'Tic Tac Toe',
    image: '/images/tictactoes.jpg',
    path: '/tictactoe',
  },
  
];

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const handleCardClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // fake loading delay
  }, []);

  return (
    <div className="home-page">
      <h2 className="title">🎰 Choose Your Casino Game</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="game-card-container">
          {games.map((game, index) => (
            <div
              key={index}
              className="game-card"
              onClick={() => handleCardClick(game.path)}
            >
              <img src={game.image} alt={game.name} className="game-image" />
              <h3>{game.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
