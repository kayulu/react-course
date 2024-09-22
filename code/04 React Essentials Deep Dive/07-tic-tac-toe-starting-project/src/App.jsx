import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <div id="game-container">
      <ul id="players">
        <Player initialName="Player 1" symbol="X" />
        <Player initialName="Player 2" symbol="O" />
      </ul>
      <GameBoard />
    </div>
  );  
}

export default App;
