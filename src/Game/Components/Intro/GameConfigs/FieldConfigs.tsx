import React, { useState } from "react";
import { IFieldParameters } from "../../../Entities/Field";
import { useGameDispatch, useGameSelector } from "../../../Redux/GameHooks";
import { changeHeight, changeWidth } from "../../../Redux/GameSlice";
import { selectFieldConfigs } from "../../../Redux/GameSelectors";
import { NumberInput } from "../../../../GlobalElements/UI/Inputs/NumberInput";

/**
 * Input form for field configurations
 * @param props 
 * @returns 
 */
export function FieldConfigs(): JSX.Element {
    const disaptch = useGameDispatch();
    const fieldConfigs = useGameSelector(selectFieldConfigs);

    const onHeightChange = (height: number) => disaptch(changeHeight(height));
    const onWidthChange = (width: number) => disaptch(changeWidth(width));

    return (
        <>
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
        </>
    );
}