import React, { useState } from "react";
import { IFieldParameters } from "../../Field";
import { useGameDispatch, useGameSelector } from "../../Redux/GameHooks";
import { changeHeight, changeWidth } from "../../Redux/GameSlice";
import { selectFieldConfigs } from "../../Redux/GameSelectors";

/**
 * Input form for field configurations
 * @param props 
 * @returns 
 */
export function FieldConfigs(): JSX.Element {
    const disaptch = useGameDispatch();
    const fieldConfigs = useGameSelector(selectFieldConfigs);

    function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
        const height: number = parseInt(event.target.value);
        disaptch(changeHeight(height));
    }

    function onWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const width: number = parseInt(event.target.value);
        disaptch(changeWidth(width));
    }

    return (
        <>
            <label>Height</label>
            <br/>
            <input
                type="number"
                value={fieldConfigs.height}
                onChange={onHeightChange}>
            </input>
            <br/>
            <label>Width</label>
            <br/>
            <input
                type="number"
                value={fieldConfigs.width}
                onChange={onWidthChange}>
            </input>
            <br/>
        </>);
}