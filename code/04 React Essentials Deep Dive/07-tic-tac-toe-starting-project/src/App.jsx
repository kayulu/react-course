import Player from "./components/Player";

function App() {
  return (
    <div id="game-container">
      <ul id="players">
        <Player name="Player 1" symbol="X" />
        <Player name="Player 2" symbol="O" />
      </ul>
      GameBoard
    </div>
  );
}

export default App;
