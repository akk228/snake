import { Level } from './Enums/Level';
import { IFieldParameters, initialState } from './Field';

export interface IGameModel {
    fieldConfigs: IFieldParameters,
    difficulty: Level
}

export const gameInitialState: IGameModel = {
    fieldConfigs: initialState,
    difficulty: Level.Easy,
};