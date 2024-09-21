import Player from "./components/Player";

function App() {
  return (
    <div id="game-container">
      <ul id="players">
        <Player name="Kayhan" symbol="X" />
        <Player name="Serap" symbol="O" />
      </ul>
      GameBoard
    </div>
  );
}

export default App;
