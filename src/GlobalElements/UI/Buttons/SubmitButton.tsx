interface IStartButtonProps {
    text: string;
    cssWrapper?: string;
    onClick: () => void;
}

export function SubmitButton(props: IStartButtonProps): JSX.Element {
    return <button 
                type="button" 
                onClick={props.onClick}
                className={props?.cssWrapper}
            >
                {props.text}
            </button>;
}