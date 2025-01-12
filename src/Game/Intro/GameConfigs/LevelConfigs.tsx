import { JsxElement } from "typescript";
import { Level } from "../../Enums/Level";
import React, { useState } from "react";

interface ILevelConfigProps {
    difficulty: Level
    onChange: (val: Level) => void;
}
export function LevelConfigs(props: ILevelConfigProps): JSX.Element {
    const onLevelChange = (val: React.ChangeEvent<HTMLInputElement>) => props.onChange(parseInt(val.target.value));

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
                    checked={props.difficulty === level}
                    onChange={onLevelChange}>
                </input>
            </div>));
    };

    return(<form>{renderDifficulty()}</form>);
}