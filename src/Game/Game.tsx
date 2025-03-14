import React, { useState } from 'react';
import { Intro } from './Components/Intro/Intro';
import { Play } from './Components/Play/Play';
import { Provider } from 'react-redux';
import { gameStore } from './Redux/GameStore';
import style from './game.module.css';
export const Game = () => {
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    
    return (
        <Provider store={gameStore}>
            <div>
                <h1>Snake game</h1>
                <div className={style.gameContainer}>
                    <Intro
                        gameStarted={gameStarted}
                        onGameStartedChange={setGameStarted}
                    />
                    {gameStarted && 
                    <Play
                        started={gameStarted}
                        onGameStartedChange={setGameStarted}
                    />}
                </div>
            </div>
        </Provider>
    );
};