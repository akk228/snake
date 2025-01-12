import { useState } from 'react';
import { Intro } from './Game/Intro/Intro';
import { Provider } from 'react-redux';
import { gameStore } from './Game/Redux/GameStore';
import { Play } from './Game/Play/Play';


function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <Provider store={gameStore}>
        <h1>Snake game</h1>
        <Intro
          gameStarted={gameStarted}
          onGameStartedChange={setGameStarted}
        />
        <Play />
    </Provider>
  );
}

export default App;
