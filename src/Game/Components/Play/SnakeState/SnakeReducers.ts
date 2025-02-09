import { Direction, Directions } from "../Components/Entities/Direction";
import { Snake, Head, X, Y } from "./Snake";

export enum SnakeActionType {
    Move = "snake/move",
    SetIsMoving = "snake/setIsMoving"
}

interface MoveAction {
    type: SnakeActionType.Move;
    payload?: Direction[];
}

interface SetIsMovingAction {
    type: SnakeActionType.SetIsMoving;
    payload?: boolean;
}

type SnakeAction = MoveAction | SetIsMovingAction;

/**
 * Main reducer function for managing snake state
 * @param state Current snake state
 * @param action Action object containing type and optional payload
 * @returns Updated snake state
 */
export function SnakeReducer(state: Snake, action: SnakeAction) {
    switch (action.type) {
        case SnakeActionType.Move:
            return MoveSnake(state, action.payload || []);
        case SnakeActionType.SetIsMoving:
            return SetSnakeMoving(state, action.payload || false);
        default:
            return state;
    }
}

/**
 * Checks if snake's head collides with any part of its body
 * @param head Current position of snake's head
 * @param body Array of body segment coordinates
 * @returns true if collision detected, false otherwise
 */
function checkCollision(head: Head, body: number[][]): boolean {
    return body.some(([x, y]) => head.x === x && head.y === y);
}

/**
 * Calculates the snake's new position based on its current direction
 * Updates the snake's body by moving all segments forward
 * Handles growth logic based on count (grows every 3 moves when count reaches 0)
 * @param snake Current snake state
 * @param directionQueue Queue of directions
 * @returns New snake state with updated position and body
 */
function MoveSnake(snake: Snake, directionQueue: Direction[]): Snake {
    if (!snake.isAlive) return snake;

    // Update direction if queue is not empty
    let newDirection = snake.direction;
    if (directionQueue.length > 0) {
        const nextDirection = directionQueue[0];
        // Check if turn is valid (not 180 degrees)
        if (!(- Directions[snake.direction][X] === Directions[nextDirection][X] ||
            - Directions[snake.direction][Y] === Directions[nextDirection][Y])) {
            newDirection = nextDirection;
        }
    }

    const newHead: Head = {
        x: (snake.field.height + snake.head.x + Directions[newDirection][X]) % snake.field.height,
        y: (snake.field.width + snake.head.y + Directions[newDirection][Y]) % snake.field.width
    }

    // Check for collision with body
    if (checkCollision(newHead, snake.body)) {
        return {
            ...snake,
            isAlive: false,
            isMoving: false
        };
    }

    if (snake.body.length === 0 && snake.count !== 0) {
        return {
            ...snake,
            direction: newDirection,
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
        direction: newDirection,
        head: newHead,
        body: newBody,
        count: (snake.count + 1) % 3
    };
}

/**
 * Updates the snake's movement state
 * @param snake Current snake state
 * @param isMoving New movement state
 * @returns Updated snake state with new movement state
 */
function SetSnakeMoving(snake: Snake, isMoving: boolean): Snake {
    return {
        ...snake,
        isMoving: isMoving || false
    };
}