import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { Field } from "./Components/Field";
import { Speed } from "./Components/Entities/Speed";
import { snakeInitialState } from "./SnakeState/Snake";
import { SnakeReducer, SnakeActionType } from "./SnakeState/SnakeReducers";
import { Direction } from "./Components/Entities/Direction";
import { DeathScreen } from "./Components/DeathScreen";
import { KeyCode } from "./Components/Entities/GameEnums";
import { usePauseResume } from "./PlayHooks/ControllHooks";

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
    const pauseResume = useCallback(() => dispatchSnake({type: SnakeActionType.SetIsMoving}), []);
    usePauseResume(pauseResume, (props.started && snake.isAlive));

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!(event.code.startsWith(KeyCode.ArrowPrefix))) {
            return;
        }

        const newDirection = event.code.substring(KeyCode.ArrowPrefix.length) as Direction;
        directionQueue.current.push(newDirection);
    },[]);

    // game loop
    useEffect(() => {
        if (!props.started || !snake.isAlive || !snake.isMoving) {
            return;
        }

        document.addEventListener('keydown', handleKeyDown);

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
        };
    }, [props.started, snake.isMoving, snake.isAlive, difficulty]);

    return (<>
        <Field snake={snake} />
        {!snake.isAlive &&
        <DeathScreen onGameRestart={() => props.onGameStartedChange(false)} />}
    </>);
}
