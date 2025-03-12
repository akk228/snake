import styles from './SubmitButton.module.css';

interface ISubmitButtonProps {
    text: string;
    onClick: () => void;
    tabIndex?: number;
    className?: string;
}

export function SubmitButton(props: ISubmitButtonProps): JSX.Element {
    return (
        <button
            className={`${styles.submitButton} ${props.className}`}
            onClick={props.onClick}
            tabIndex={props.tabIndex}
        >
            {props.text}
        </button>
    );
}