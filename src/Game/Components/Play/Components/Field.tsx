import { useGameSelector } from "../../../Redux/GameHooks";
import { selectFieldConfigs } from "../../../Redux/GameSelectors";
import { CellType } from "../Entities/CellType";
import { Cell } from "./Cell";
import { Snake, X, Y } from "../SnakeState/Snake";


interface IFieldProps {

    snake: Snake;
}


export function Field(props: IFieldProps): JSX.Element {
    const fieldConfigs = useGameSelector(selectFieldConfigs);
    const field = initializeField(fieldConfigs.height, fieldConfigs.width, props.snake)
        .map((rowOfCells: CellType[], rowIndex: number) => (
            <div key={rowIndex} style={{margin: 0}}>
                {rowOfCells.map((cell: CellType, colIndex: number) => <Cell key={colIndex} type={cell} />)}
            </div>));

    return (
        <div style={{margin: 0, position: "fixed"}}>
            {field}
        </div>
    );
}

function initializeField(rows: number, cols: number, snake: Snake) {
    const array: CellType[][] = [];

    for (let i = 0; i < rows; i++) {
        array[i] = [];

        for (let j = 0; j < cols; j++) {
            array[i][j] = CellType.Empty;
        }
    }

    array[snake.head.x][snake.head.y] = CellType.SnakeHead;

    for (let i = 0; i < snake.body.length; i++) {
        array[snake.body[i][X]][snake.body[i][Y]] = CellType.SnakeBody;
    }

    return array;

}