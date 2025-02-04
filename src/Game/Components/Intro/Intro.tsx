import { SubmitButton } from "../../../GlobalElements/UI/Buttons/SubmitButton";
import { FieldConfigs } from "./GameConfigs/FieldConfigs";
import { LevelConfigs } from "./GameConfigs/LevelConfigs";

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
    const onStart = () => props.onGameStartedChange(!props.gameStarted);

    if (props.gameStarted) {
        return (<SubmitButton
            text={"Go!"}
            onClick={onStart}
        />);
    }
    
    return (
        <>
            <SubmitButton
                text={"Go!"}
                onClick={onStart}
            />
            <FieldConfigs />
            <LevelConfigs />
        </>
    );
}