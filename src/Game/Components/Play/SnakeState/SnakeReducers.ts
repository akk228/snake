import { Direction, Directions } from "../Components/Entities/Direction";
import { Snake, Head, X, Y, Coordinates,  } from "./Snake";

export enum SnakeActionType {
    Move = "snake/move",
    SetIsMoving = "snake/setIsMoving",
    AddObstacle = "snake/addObstacle"
}

interface MoveAction {
    type: SnakeActionType.Move;
    payload?: Direction[];
}

interface SetIsMovingAction {
    type: SnakeActionType.SetIsMoving;
}

interface AddObstacleAction {
    type: SnakeActionType.AddObstacle;
}

type SnakeAction = MoveAction | SetIsMovingAction | AddObstacleAction;

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
            return SetSnakeMoving(state);
        case SnakeActionType.AddObstacle:
            return AddObstacle(state);
        default:
            return state;
    }
}

/**
 * Checks if snake's head collides with any part of its body or an obstacle
 * @param head Current position of snake's head
 * @param body Array of body segment coordinates
 * @param obstacles Array of obstacle coordinates
 * @returns true if collision detected, false otherwise
 */
function checkCollision(head: Head, body: number[][], obstacles: Coordinates[]): boolean {
    return body.some(([x, y]) => head.x === x && head.y === y) ||
           obstacles.some(obstacle => head.x === obstacle.x && head.y === obstacle.y);
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

    // Check for collision with body or obstacles
    if (checkCollision(newHead, snake.body, snake.obstacles)) {
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
function SetSnakeMoving(snake: Snake): Snake {
    return {
        ...snake,
        isMoving: !snake.isMoving
    };
}

/**
 * Adds a new obstacle to the snake's field
 * @param state Current snake state
 * @param obstacle Coordinates of the new obstacle
 * @returns Updated snake state with the new obstacle added
 */
function AddObstacle(state: Snake): Snake {
    const allowedCells = new Array<Coordinates>();

    for (let i = 0; i < state.field.height; i++) {
        for (let j = 0; j < state.field.width; j++) {
            if (i == state.head.x && j == state.head.y) continue;
            if (state.body.some(([x, y]) => x == i && y == j)) continue;
            if (state.obstacles.some(obstacle => obstacle.x == i && obstacle.y == j)) continue;
            allowedCells.push({ x: i, y: j });
        }
    }

    const newObstacle = Math.floor(Math.random() * allowedCells.length);
    
    return {
            ...state,
            obstacles: [...state.obstacles, allowedCells[newObstacle]]
        };
}

/**
 * Checks if the obstacle can be created given the location of the head and where it's moving.
 * Namely, obstacle can't be created in the place of a Head or in the place where the Head is moving.
 * @param head Current position of snake's head
 * @param direction Current direction of the snake
 * @param obstacle Coordinates of the obstacle
 * @returns true if collision detected, false otherwise
 */
function checkHeadCollision(head: Head, direction: Direction, obstacle: Coordinates): boolean {
    return (head.x === obstacle.x && head.y === obstacle.y) || 
        (head.x + Directions[direction][X] === obstacle.x && head.y + Directions[direction][Y] === obstacle.y);
}

/**
 * Checks if the obstacle collides with any part of the snake's body
 * @param obstacle Coordinates of the obstacle
 * @param body Array of body segment coordinates
 * @returns true if collision detected, false otherwise
 */
function checkBodyCollision(obstacle: Coordinates, body: number[][]): boolean {
    return body.some(([x, y]) => obstacle.x === x && obstacle.y === y);
}