interface INumberInputProps {
    label: string,
    value: number,
    onChange: (val: number) => any;
}

/**
 * function to render generic html input form for a number
 * @param props { label, value, onChangeCallback}
 * @returns Generic input form for a number
 */
export function NumberInput(props: INumberInputProps): JSX.Element {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val: number = parseInt(event.target.value);
        props.onChange(val);
    }

    return (
        <>
            <label>{props.label}</label>
            <br/>
            <input
                type="number"
                value={props.value}
                onChange={onChange}
            >
            </input>
            <br/>
        </>
    );
}