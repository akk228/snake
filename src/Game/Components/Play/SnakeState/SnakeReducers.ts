import { Direction, Directions } from "../Components/Entities/Direction";
import { Snake, Head, X, Y } from "./Snake";

interface SnakePayload {
    type: string;
    payload?: any;
}

export function SnakeReducer(state: Snake, action: SnakePayload){
    switch (action.type) {
        case "snake/move" :
            return MoveSnake(state);
        case "snake/changeDirection" :
            return ChangeDirection(state, action.payload);
        case "snake/increaseLength" :
            break;
        default:
            break; 
    }

    return state;
}

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

    const newBody = snake.count === 0 && snake.body.length > 0 
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

function ChangeDirection(snake: Snake, newDirection: Direction): Snake {
    if (- Directions[snake.direction][X] === Directions[newDirection][X] ||
        - Directions[snake.direction][Y] === Directions[newDirection][Y]) {
        return snake;
    }

    return {...snake, direction: newDirection};
}
