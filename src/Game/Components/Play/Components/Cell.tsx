import { memo } from "react";
import { CellType } from "../Entities/CellType";
import './Styles/Cell.css'
interface ICellProps {
    type: number;
}

export const Cell = memo( (props: ICellProps): JSX.Element => {
    const setColor = (cellType: CellType): string => {
        switch (cellType) {
            case CellType.SnakeHead:
                return 'red';
            case CellType.SnakeBody:
                return 'green';
            case CellType.Empty:
                return 'yellow';
            default:
                return 'yellow';
        }
    }


    return <button
                className="cellStyle"
                style={{ backgroundColor: setColor(props.type)}}
            ></button>;
})