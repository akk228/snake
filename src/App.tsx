import React, { useState } from 'react';
import { Intro } from './Game/Intro/Intro';
import { IFieldParameters, initialState } from './Game/Field';
import IGameModel from './Game/Model';
import { Level } from './Game/Enums/Level';

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [game, setGame] = useState<IGameModel>({ fieldConfigs: initialState, snakeSpeed: 500, difficulty: Level.Easy });

  return (
    <div>
      <h1>Snake game</h1>
      <Intro
        gameStarted={gameStarted}
        onGameStartedChange={setGameStarted}
        gameConfigs={game}
        onGameConfigsChange={setGame}
      />
    </div>
  );
}

export default App;
