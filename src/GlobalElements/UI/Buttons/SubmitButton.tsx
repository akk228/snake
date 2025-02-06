interface IStartButtonProps {
    text: string;
    cssWrapper?: string;
    onClick: () => void;
    className?: string;
    tabIndex?: number;
}

export function SubmitButton(props: IStartButtonProps): JSX.Element {
    return <button 
                type="button" 
                onClick={props.onClick}
                className={props?.cssWrapper}
                tabIndex={props.tabIndex}
            >
                {props.text}
            </button>;
}