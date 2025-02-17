import { useGameDispatch, useGameSelector } from "../../../Redux/GameHooks";
import { changeHeight, changeWidth } from "../../../Redux/GameSlice";
import { selectFieldConfigs } from "../../../Redux/GameSelectors";
import { NumberInput } from "../../../../GlobalElements/UI/Inputs/NumberInput";

interface IFieldConfigsProps {
    cssWrapper?: string; 
}

/**
 * Input form for field configurations
 * @param props 
 * @returns 
 */
export function FieldConfigs(props: IFieldConfigsProps): JSX.Element {
    const disaptch = useGameDispatch();
    const fieldConfigs = useGameSelector(selectFieldConfigs);

    const onHeightChange = (height: number) => disaptch(changeHeight(height));
    const onWidthChange = (width: number) => disaptch(changeWidth(width));

    return (
        <div className={props.cssWrapper}>
            <NumberInput
                label="Height"
                value={fieldConfigs.height}
                onChange={onHeightChange}
            />
            <NumberInput
                label="Width"
                value={fieldConfigs.width}
                onChange={onWidthChange}
            />
        </div>
    );
}