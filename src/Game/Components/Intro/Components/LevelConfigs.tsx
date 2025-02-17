import { Level } from "../../../Entities/Enums/Level";
import { useGameDispatch, useGameSelector } from "../../../Redux/GameHooks";
import { selectDifficulty } from "../../../Redux/GameSelectors";
import { changeDifficulty } from "../../../Redux/GameSlice";
import { Levels } from "../../../Entities/Constants/Levels";
import { IRadioValue, RadioButton } from "../../../../GlobalElements/UI/Inputs/RadioButton";
import styles from '../Intro.module.css';

export function LevelConfigs(): JSX.Element {
    const dispatch = useGameDispatch();
    const gameLevel = useGameSelector(selectDifficulty);

    const onLevelChange = (level: Level) => dispatch(changeDifficulty(level));
    
    const levels: IRadioValue[] = Levels.map((level: Level): IRadioValue => ({
        label: { 
            text: Level[level],
            key: level
        },
        value: level
    }));

    return <RadioButton
                cssWrapper={styles.levelConfigs}
                selected={gameLevel}
                values={levels}
                onChange={onLevelChange}
            />;
}