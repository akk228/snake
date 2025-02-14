import { IFieldParameters } from "../../../Entities/Field";
import { Direction } from "../Components/Entities/Direction";

export const X = 0;
export const Y = 1;


export interface Head {
    x: number;
    y: number;
}

export interface Snake {
    direction: Direction;
    head: Head;
    body: number[][];
    obstacles: Coordinates[];
    field: IFieldParameters;
    count: number;
    isMoving: boolean;
    isAlive: boolean;
}

export function snakeInitialState(height: number, width: number): Snake {
    return {
        direction: Direction.Up,
        head: initializeHead(height, width),
        body: [],
        obstacles: [],
        field: { height, width },
        count: 1,
        isMoving: true,
        isAlive: true
    };
}

const initializeHead = (height: number, width: number): Head => ({
    x: Math.floor(Math.random() * height),
    y: Math.floor(Math.random() * width)
});

export interface Coordinates {
    x: number;
    y: number;
}