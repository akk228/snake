import React, { useState } from "react";
import { IFieldParameters } from "../../Field";

interface IFieldConfigsProps {
    field: IFieldParameters,
    onChange: (val: IFieldParameters) => void
}

/**
 * Input form for field configurations
 * @param props 
 * @returns 
 */
export function FieldConfigs(props: IFieldConfigsProps): JSX.Element {
    function onHeightChange(event: React.ChangeEvent<HTMLInputElement>) {
        const height: number = parseInt(event.target.value);
        props.onChange({...props.field, height: height});
    }

    function onWidthChange(event: React.ChangeEvent<HTMLInputElement>) {
        const width: number = parseInt(event.target.value);
        props.onChange({...props.field, width: width});
    }

    return (
        <>
            <label>Height</label>
            <br/>
            <input
                type="number"
                value={props.field.height}
                onChange={onHeightChange}>
            </input>
            <br/>
            <label>Width</label>
            <br/>
            <input
                type="number"
                value={props.field.width}
                onChange={onWidthChange}>
            </input>
            <br/>
        </>);
}