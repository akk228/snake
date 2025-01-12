import { useState } from 'react';
import { Intro } from './Game/Intro/Intro';
import { initialState } from './Game/Field';
import { IGameModel } from './Game/Model';
import { Level } from './Game/Enums/Level';
import { Provider, useSelector } from 'react-redux';
import { gameStore } from './Game/Redux/GameStore';
import { Play } from './Game/Play/Play';


function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <Provider store={gameStore}>
      <div>
        <h1>Snake game</h1>
        <Intro
          gameStarted={gameStarted}
          onGameStartedChange={setGameStarted}
        />
        <Play />
      </div>
    </Provider>
  );
}

export default App;
