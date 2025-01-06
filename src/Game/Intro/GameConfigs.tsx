import { useReducer, useState } from "react";
import { IFieldParameters } from "../Field";
import IGameModel from "../Model";
import { FieldConfigs } from "./GameConfigs/FieldConfigs";
import { LevelConfigs } from "./GameConfigs/LevelConfigs";
import { Level } from "../Enums/Level";

interface IGameConfigs {
    gameConfigs: IGameModel,
    onGameConfigsChange: (val: IGameModel) => void
}

enum GameRedcuerActionType {
    Field,
    Difficulty
}

interface IGameModelAction {
    type: GameRedcuerActionType,
    fieldParams?: IFieldParameters,
    difficulty?: Level,
}

function gameModelReducer(state: IGameModel, action: IGameModelAction): IGameModel {
    const newGame: IGameModel = {...state};

    switch(action.type) {
        case GameRedcuerActionType.Field:
            newGame.fieldConfigs = action.fieldParams as IFieldParameters;
            break;
        case GameRedcuerActionType.Difficulty:
            newGame.difficulty = action.difficulty as Level;
            break;
        default:
            throw new Error('Action for IGameModel not implemented.');
    }

    return newGame;
}

export function GameConfigs(props: IGameConfigs): JSX.Element {
    const [saved, setSaved] = useState(false);
    const [gameConfigs, dispatchGameConfigs] = useReducer(gameModelReducer, props.gameConfigs);

    const onLevelChange = (level: Level) =>
        dispatchGameConfigs({
            type: GameRedcuerActionType.Difficulty,
            difficulty: level
        });

    const onFieldParamsChange = (fieldConfigs: IFieldParameters) =>
        dispatchGameConfigs({
            type: GameRedcuerActionType.Field,
            fieldParams: fieldConfigs
        });
        
    const onSaveEdit = () => {
        if(!saved) {
            props.onGameConfigsChange({...gameConfigs});
        }

        setSaved(!saved);
    }

    return (
        <>
            <button onClick={() => onSaveEdit()}>{saved ? "Edit" : "Save"}</button>
            <fieldset disabled={saved}>
                <FieldConfigs
                    field={gameConfigs.fieldConfigs}
                    onChange={onFieldParamsChange}
                />
                <LevelConfigs
                    difficulty={gameConfigs.difficulty}
                    onChange={onLevelChange}
                />
            </fieldset>
        </>);
}