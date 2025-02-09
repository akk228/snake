export enum Direction {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}

export const Directions: Record<Direction, number[]> = {
    [Direction.Up]: [-1, 0],
    [Direction.Down]: [1, 0],
    [Direction.Left]: [0, -1],
    [Direction.Right]: [0, 1]
}