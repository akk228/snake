import { JsxElement } from "typescript";
import { Level } from "../../Enums/Level";
import React, { useState } from "react";
import { useGameDispatch, useGameSelector } from "../../Redux/GameHooks";
import { selectDifficulty } from "../../Redux/GameSelectors";
import { changeDifficulty } from "../../Redux/GameSlice";

export function LevelConfigs(): JSX.Element {
    const gameLevel = useGameSelector(selectDifficulty);
    const dispatch = useGameDispatch();

    const onLevelChange = (val: React.ChangeEvent<HTMLInputElement>) => dispatch(changeDifficulty(parseInt(val.target.value)));

    const renderDifficulty = () => {
        const levels: Level[] = [Level.Easy, Level.Medium, Level.FuckHard];

        return levels.map((level: Level): React.ReactElement => (
            <div key={`difficultyLevel-${level}`}>
                <label htmlFor={`level-${level}`}>
                    <code>{Level[level]}</code>
                </label>
                <input
                    type="radio"
                    id={`level-${level}`}
                    value={level}
                    checked={gameLevel === level}
                    onChange={onLevelChange}>
                </input>
            </div>));
    };

    return(<form>{renderDifficulty()}</form>);
}