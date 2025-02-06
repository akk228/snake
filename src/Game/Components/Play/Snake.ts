import { IFieldParameters, initialState } from "../../Entities/Field";
import { Direction, Directions } from "./Components/Entities/Direction";

export const X = 0;
export const Y = 1;


interface Head {
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

    const newBody = new Array<number[]>();

    newBody.push([snake.head.x, snake.head.y]);

    for (let i = 1; i < snake.body.length; i++) {
        newBody.push([...snake.body[i - 1]]);
    }

    if (snake.count === 0 && snake.body.length > 0) {
        newBody.push([...snake.body[snake.body.length - 1]]);
    }

    return {
        ...snake,
        head: newHead,
        body: newBody,
        count: (snake.count + 1) % 3
    };

}

function ChangeDirection(snake: Snake, newDirection: Direction): Snake {    
    return {...snake, direction: newDirection};
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