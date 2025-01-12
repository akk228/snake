import { IGameModel } from "../Entities/Model";
import { GameStateType } from "./GameStore";

export const selectFieldConfigs = (state: GameStateType) => state.fieldConfigs;
export const selectDifficulty = (state: GameStateType) => state.difficulty; 