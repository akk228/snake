import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useEffect, useReducer, useRef } from "react";
import { Field } from "./Components/Field";
import { Speed } from "./Components/Entities/Speed";
import { snakeInitialState } from "./SnakeState/Snake";
import { SnakeReducer, SnakeActionType } from "./SnakeState/SnakeReducers";
import { Direction } from "./Components/Entities/Direction";

interface IPlayProps {
    started: boolean;
    onGameStartedChange: (val: boolean) => void
}

export function Play(props: IPlayProps): JSX.Element {
    const field = useGameSelector(selectFieldConfigs);
    const difficulty = useGameSelector(selectDifficulty);
    const snakeInitial = snakeInitialState(field.height, field.width);
    const [snake, dispatchSnake] = useReducer(SnakeReducer, snakeInitial);
    const directionQueue = useRef<Direction[]>([]);

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code !== "Tab") {
            event.preventDefault();
        }

        if (event.code === "Space") {
            handleGamePersumePause();
        }

        if (snake.isMoving && event.code.startsWith("Arrow")) {
            const newDirection = event.code.substring("Arrow".length) as Direction;
            directionQueue.current.push(newDirection);
        }
    };

    const handleGamePersumePause = () => {
        dispatchSnake({
            type: SnakeActionType.SetIsMoving,
            payload: !snake.isMoving
        });
    };

    useEffect(() => {
        if (!props.started) {
            return;
        }

        document.addEventListener('keydown', handleKeyDown);


        if (!snake.isMoving) {
            return;
        }

        let frameId: number;
        let lastTime = 0;
        const interval = Speed[difficulty];

        const gameLoop = (timestamp: number) => {
            if (timestamp - lastTime >= interval) {
                const currentDirections = [...directionQueue.current];
                dispatchSnake({ 
                    type: SnakeActionType.Move, 
                    payload: currentDirections 
                });
                if (directionQueue.current.length > 0) {
                    directionQueue.current.shift();
                }
                lastTime = timestamp;
            }
            frameId = requestAnimationFrame(gameLoop);
        };

        frameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(frameId);
            document.removeEventListener('keydown', handleKeyDown);
            directionQueue.current = [];
        };
    }, [snake.isMoving]);

    return (<Field snake={snake} />);
}