import { useState } from 'react';
import { Intro } from './Game/Components/Intro/Intro';
import { Provider } from 'react-redux';
import { gameStore } from './Game/Redux/GameStore';
import { Play } from './Game/Components/Play/Play';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <Provider store={gameStore}>
      <h1>Snake game</h1>
      <Intro
        gameStarted={gameStarted}
        onGameStartedChange={setGameStarted}
      />
      {gameStarted && 
      <Play
        started={gameStarted}
        onGameStartedChange={setGameStarted}
      />}
    </Provider>
  );
}

export default App;
