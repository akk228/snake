import { Level } from "../../../../Entities/Enums/Level";

export enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}

export const Directions = {
    [Direction[Direction.Up]]: [-1, 0],
    [Direction[Direction.Down]]: [1, 0],
    [Direction[Direction.Left]]: [0, -1],
    [Direction[Direction.Right]]: [0, 1]
}