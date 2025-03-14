import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { gameInitialState, IGameModel } from "../Entities/Game";
import { Level } from "../Entities/Enums/Level";

export const gameSlice = createSlice({
    name: "SnakeGame",
    initialState: gameInitialState,
    reducers: {
        changeHeight: (state: IGameModel, action: PayloadAction<number>) => {
            state.fieldConfigs.height = action.payload;
        },
        changeWidth: (state: IGameModel, action: PayloadAction<number>) => {
            state.fieldConfigs.width = action.payload;
        },
        changeDifficulty: (state: IGameModel, action: PayloadAction<Level>) => {
            state.difficulty = action.payload;
        }
    }
});

export const { changeHeight, changeWidth, changeDifficulty} = gameSlice.actions;