import { memo } from "react";
import { CellType } from "../Entities/CellType";
import './Styles/Cell.css'

interface ICellProps {
    type: CellType;
}

export const Cell = memo(function Cell({ type }: ICellProps): JSX.Element {
    const setColor = (cellType: CellType): string => {
        switch (cellType) {
            case CellType.SnakeHead:
                return 'red';
            case CellType.SnakeBody:
                return 'green';
            case CellType.Empty:
                return 'yellow';
            case CellType.Obstacle:
                return 'brown';
            default:
                return 'yellow';
        }
    }

    return <button
                className="cellStyle"
                style={{ backgroundColor: setColor(type)}}
            ></button>;
});