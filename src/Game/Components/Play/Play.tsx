import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useEffect, useReducer } from "react";
import { Field } from "./Components/Field";
import { Speed } from "./Components/Entities/Speed";
import { snakeInitialState } from "./SnakeState/Snake";
import { SnakeReducer } from "./SnakeState/SnakeReducers";
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

    // Define handler outside to properly remove it later
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.code !== "Tab") {
            event.preventDefault();
        }

        if (event.code === "Space") {
            props.onGameStartedChange(!props.started);
        }

        if (event.code.startsWith("Arrow")) {
            dispatchSnake({
                type: "snake/changeDirection",
                payload: event.code.substring("Arrow".length) as Direction
            });
        }
    };

    useEffect(() => {
        if (!props.started) {
            return;
        }

        const gameClock = setInterval(
            () => dispatchSnake({ type: "snake/move" }), 
            Speed[difficulty]
        );

        // Add event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup function
        return () => {
            clearInterval(gameClock);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.started]); // Keeping original dependency

    return (<Field snake={snake} />);
}