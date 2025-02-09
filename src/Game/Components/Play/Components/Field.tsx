import { useMemo } from 'react';
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
    
    const field = useMemo(() => {
        const initialField = initializeField(fieldConfigs.height, fieldConfigs.width, props.snake);
        return initialField.flat().map((cell: CellType, index: number) => (
            <Cell 
                key={index} 
                type={cell} 
            />
        ));
    }, [fieldConfigs.height, fieldConfigs.width, props.snake]);

    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div style={{
                margin: 0,
                display: 'grid',
                gridTemplateColumns: `repeat(${fieldConfigs.width}, 1fr)`,
                gap: 0
            }}>
                {field}
            </div>
        </div>
    );
}

function initializeField(rows: number, cols: number, snake: Snake) {
    // Create empty field with typed array for better performance
    const array = new Array(rows).fill(null)
        .map(() => new Array(cols).fill(CellType.Empty));

    // Fill snake body cells directly
    snake.body.forEach(([x, y]) => {
        array[x][y] = CellType.SnakeBody;
    });

    // Set snake head
    array[snake.head.x][snake.head.y] = CellType.SnakeHead;

    return array;
}