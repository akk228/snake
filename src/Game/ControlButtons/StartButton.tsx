import React from "react";

interface IStartButtonProps {
    onStart: () => void;
}

export function StartButton(props: IStartButtonProps): JSX.Element {
    return <div><button type="button" onClick={props.onStart}>Go!</button></div>;
}