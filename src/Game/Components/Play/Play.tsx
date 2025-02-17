import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useCallback, useReducer, useRef } from "react";
import { Field } from "./Components/Field";
import { snakeInitialState } from "./SnakeState/Snake";
import { SnakeReducer, SnakeActionType } from "./SnakeState/SnakeReducers";
import { Direction } from "./Components/Entities/Direction";
import { DeathScreen } from "./Components/DeathScreen";
import { usePauseResume, useGameLoop, useCreateObstacle } from "./PlayHooks/ControlHooks";

interface IPlayProps {
    started: boolean;
    onGameStartedChange: (val: boolean) => void
}

export function Play(props: IPlayProps): JSX.Element {
    const field = useGameSelector(selectFieldConfigs);
    const difficulty = useGameSelector(selectDifficulty);
    const snakeInitial = useRef(snakeInitialState(field.height, field.width));
    const directionQueue = useRef<Direction[]>([]);
    const [snake, dispatchSnake] = useReducer(SnakeReducer, snakeInitial.current);
    const pauseResume = useCallback(() => dispatchSnake({type: SnakeActionType.SetIsMoving}), []);

    usePauseResume(pauseResume, (props.started && snake.isAlive));
    useGameLoop(props.started && snake.isAlive, snake.isMoving, difficulty, directionQueue, dispatchSnake);
    useCreateObstacle(props.started && snake.isAlive, snake.isMoving, difficulty, dispatchSnake);

    return (<>
        <Field snake={snake} />
        {!snake.isAlive &&
        <DeathScreen onGameRestart={() => props.onGameStartedChange(false)} />}
    </>);
}
