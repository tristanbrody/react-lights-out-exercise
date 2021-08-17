import React from "react";
import Board from "./Board";
import "./App.css";
import "./Board.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Board nrows={3} ncols={3} className="Board" />
    </div>
  );
}

export default App;
