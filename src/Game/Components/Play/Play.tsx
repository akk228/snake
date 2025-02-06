import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useEffect, useReducer, useRef, useState } from "react";
import { Field } from "./Components/Field";
import { Directions, Direction } from "./Components/Entities/Direction";
import { Speed } from "./Components/Entities/Speed";
import { Level } from "../../Entities/Enums/Level";
import { snakeInitialState, SnakeReducer } from "./Snake";

interface IPlayProps {
    started: boolean;
    onGameStartedChange: (val: boolean) => void
}

export function Play(props: IPlayProps): JSX.Element {
    const field = useGameSelector(selectFieldConfigs);
    const difficulty = useGameSelector(selectDifficulty);
    const snakeInitial = snakeInitialState(field.height, field.width);

    const [ snake, dispatchSnake ] = useReducer(SnakeReducer, snakeInitial)
    
    const setUpControlls = () => {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            if (event.code === "Space") {
                props.onGameStartedChange(!props.started);
            }

            
            if (event.code.startsWith("Arrow")) {
                const direction = event.code.substring("Arrow".length) as Direction;
                dispatchSnake({
                    type: "snake/changeDirection",
                    payload: direction
                });
            }
        })
    }

    const removeControls = () => {
        document.removeEventListener('keydown', ()=>{});
    }

    useEffect(() => {
            if (props.started) {
                const gameClock = setInterval(() => dispatchSnake({ type: "snake/move"}), Speed[difficulty]);
                
                setUpControlls();

                return () => {
                    clearInterval(gameClock);
                    removeControls();
                };
            };
        },
        [props.started]
    );

    return (<Field x={snake.head.x} y={snake.head.y}/> );
}