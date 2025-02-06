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
    field: IFieldParameters;
    count: number;
}

export const snakeInitialState = (height: number, width: number) => ({
    direction: Direction.Up,
    head: initializeHead(height, width),
    body: new Array<number[]>(),
    field: {
        height: height,
        width: width
    },
    count: 1
});

const initializeHead = (height: number, width: number) => ({
    x: Math.floor(Math.random()*((height))),
    y: Math.floor(Math.random()*((width)))
});