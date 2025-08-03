import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./page/Home";
import MinesGame from "./page/Mines";
import TicTacToe from "./page/TicTacToe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mines" element={<MinesGame />} />
      <Route path="/tictactoe" element={<TicTacToe />} />
    </Routes>
  );
}

export default App;
