import { SubmitButton } from "../../../GlobalElements/UI/Buttons/SubmitButton";
import { FieldConfigs } from "./Components/FieldConfigs";
import { LevelConfigs } from "./Components/LevelConfigs";
import styles from "./Intro.module.css";

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

    return (
        <div className={styles.introContainer}>
            <SubmitButton
                text={props.gameStarted ? "Stop!" : "Go!"}
                onClick={onStart}
                tabIndex={-1}
                className={styles.goButton}
            />
            {!props.gameStarted &&
            <>
                <FieldConfigs cssWrapper={styles.fieldConfigs}/>
                <LevelConfigs />
            </>}
        </div>
    );
}