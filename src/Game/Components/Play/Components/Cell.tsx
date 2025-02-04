import { memo } from "react";
import { CellType } from "../Entities/CellType";
import './Styles/Cell.css'
interface ICellProps {
    type: number;
}

export const Cell = memo( (props: ICellProps): JSX.Element => {
    const color = props.type === CellType.SnakeHead ? `red` : `yellow` ;
    return <button
                className="cellStyle"
                style={{ backgroundColor: color}}
            ></button>;
})