import { useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../../Redux/GameSelectors";
import { useEffect, useRef, useState } from "react";
import { Field } from "./Components/Field";
import { Direction } from "./Components/Entities/Direction";
import { Speed } from "./Components/Entities/Speed";
import { Level } from "../../Entities/Enums/Level";

interface Head {
    x:number;
    y: number;
    direction: number[];
}

interface IPlayProps {
    started: boolean;
    onGameStartedChange: (val: boolean) => void
}

export function Play(props: IPlayProps): JSX.Element {
    const field = useGameSelector(selectFieldConfigs);
    const difficulty = useGameSelector(selectDifficulty);

    const [ head, setHead] = useState<Head>(initialLocation(field.height, field.width));

    const moveHead = () => {
        setHead((head: Head) => ({
            x: (field.height + head.x + head.direction[0]) % field.height,
            y: (field.width + head.y + head.direction[1]) % field.width,
            direction: head.direction
        }));
    }

    const setUpControlls = () => {
        document.addEventListener('keydown', (event: KeyboardEvent) => {
            switch (event.code) {
                case "Backspace" :
                    props.onGameStartedChange(!props.started);
                    break;
                case "ArrowUp":
                    setHead((head) => ({...head, direction: Direction.Up}));
                    break;
                case "ArrowDown":
                    setHead((head) => ({...head, direction: Direction.Down}));
                        break;
                case "ArrowLeft":
                    setHead((head) => ({...head, direction: Direction.Left}));
                        break;
                case "ArrowRight":
                    setHead((head) => ({...head, direction: Direction.Right}));
                    break;
                default :
                    break;
            }
        })
    }

    const deleteControls = () => {
        document.removeEventListener('keydown', ()=>{});
    }

    useEffect(() => {
            if (props.started) {
                const gameClock = setInterval(moveHead, Speed[Level[difficulty]]);
                setUpControlls();
                return () => {
                    clearInterval(gameClock);
                    deleteControls();
                };
            };
        },
        [props.started]
    );

    return (<Field x={head.x} y={head.y}/> );
}

const initialLocation = (height: number, width: number) => ({
    x: Math.floor(Math.random()*((height))),
    y: Math.floor(Math.random()*((width))),
    direction: Direction.Up
});