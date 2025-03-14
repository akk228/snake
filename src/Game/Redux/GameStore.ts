import { configureStore } from "@reduxjs/toolkit";
import { gameSlice } from "./GameSlice";

// TODO: create root reducer, and combine all reducers
export const gameStore = configureStore({
    reducer: gameSlice.reducer
});

// export types for selectors
export type GameType = typeof gameStore;
export type GameStateType = ReturnType<GameType['getState']>;
export type GameDisaptch = GameType['dispatch'];