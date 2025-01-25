import React from "react";

interface ILabel {
    text: string;
    key: number | string;
    cssWrapper?: string
}

export interface IRadioValue {
    label: ILabel;
    value: number;
}

interface IRadioButtonProps {
    selected?: any;
    values: IRadioValue[];
    cssWrapper?: string;
    onChange: (val: number) => void;
}

export function RadioButton(props: IRadioButtonProps): JSX.Element {
    const onRadioValueChange = (val: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(parseInt(val.target.value));
    }

    const renderChoice = (): React.ReactElement[] => {
        return props.values.map( ({ label, value }): React.ReactElement => (
            <div key={`radio-${label.key}`}>
                <label 
                    htmlFor={`radio-label-${label.key}`}
                >
                    {label.text}
                </label>
                <input
                    type="radio"
                    id={`radio-label-${label}`}
                    value={value}
                    checked={props.selected === value}
                    onChange={onRadioValueChange}>
                </input>
            </div>)
        );
    }

    return (<form className={props.cssWrapper}>{renderChoice()}</form>);
}