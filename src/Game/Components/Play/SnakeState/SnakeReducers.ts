import { Direction, Directions } from "../Components/Entities/Direction";
import { Snake, Head, X, Y } from "./Snake";

export enum SnakeActionType {
    Move = "snake/move",
    ChangeDirection = "snake/changeDirection"
}

interface SnakeAction {
    type: SnakeActionType;
    payload?: any;
}

/**
 * Main reducer function for managing snake state
 * @param state Current snake state
 * @param action Action object containing type and optional payload
 * @returns Updated snake state
 */
export function SnakeReducer(state: Snake, action: SnakeAction){
    switch (action.type) {
        case SnakeActionType.Move:
            return MoveSnake(state);
        case SnakeActionType.ChangeDirection:
            return ChangeDirection(state, action.payload);
        default:
            return state;
    }
}

/**
 * Calculates the snake's new position based on its current direction
 * Updates the snake's body by moving all segments forward
 * Handles growth logic based on count (grows every 3 moves when count reaches 0)
 * @param snake Current snake state
 * @returns New snake state with updated position and body
 */
function MoveSnake(snake: Snake): Snake {
    const newHead: Head = {
        x: (snake.field.height + snake.head.x + Directions[snake.direction][X]) % snake.field.height,
        y: (snake.field.width + snake.head.y + Directions[snake.direction][Y]) % snake.field.width
    }

    if (snake.body.length === 0 && snake.count !== 0) {
        return {
            ...snake,
            head: newHead,
            count: (snake.count + 1) % 3
        };
    }

    const newBody = snake.count === 0
        ? new Array(snake.body.length + 1)
        : new Array(snake.body.length);


    newBody[0] = [snake.head.x, snake.head.y];

    for (let i = 1; i < snake.body.length; i++) {
        newBody[i] = [...snake.body[i - 1]];
    }

    if (snake.count === 0 && snake.body.length > 0) {
        newBody[newBody.length - 1] = [...snake.body[snake.body.length - 1]];
    }

    return {
        ...snake,
        head: newHead,
        body: newBody,
        count: (snake.count + 1) % 3
    };
}

/**
 * Updates the snake's direction if the new direction is valid
 * Prevents 180-degree turns by checking if new direction is opposite to current
 * @param snake Current snake state
 * @param newDirection New direction to change to
 * @returns Updated snake state with new direction or unchanged state if invalid
 */
function ChangeDirection(snake: Snake, newDirection: Direction): Snake {
    if (- Directions[snake.direction][X] === Directions[newDirection][X] ||
        - Directions[snake.direction][Y] === Directions[newDirection][Y]) {
        return snake;
    }

    return {...snake, direction: newDirection};
}
