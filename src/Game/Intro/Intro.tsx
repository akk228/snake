import { SubmitButton } from "../../GlobalElements/UI/Buttons/SubmitButton";
import { GameConfigs } from "./GameConfigs";

interface IIntroProps {
    gameStarted: boolean,
    onGameStartedChange: (val: boolean) => void
}

/**
 * Form that opens before starting the game, that is used to set game parameters, and start the game
 * @param props
 * @returns 
 */
export function Intro(props: IIntroProps): JSX.Element {
    if (props.gameStarted) return <></>;
    
    const onStart = () => props.onGameStartedChange(true);

    return (
        <>
            <SubmitButton
                text={"Go!"}
                onClick={onStart} />
            <GameConfigs />
        </>
    );
}