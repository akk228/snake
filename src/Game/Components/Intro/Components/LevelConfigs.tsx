import { Level } from "../../../Entities/Enums/Level";
import { useGameDispatch, useGameSelector } from "../../../Redux/GameHooks";
import { selectDifficulty } from "../../../Redux/GameSelectors";
import { changeDifficulty } from "../../../Redux/GameSlice";
import { Levels } from "../../../Entities/Constants/Levels";
import { IRadioValue, RadioButton } from "../../../../GlobalElements/UI/Inputs/RadioButton";

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
                selected={gameLevel}
                values={levels}
                onChange={onLevelChange}
            />;
}