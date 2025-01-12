import { useDispatch, useSelector } from "react-redux";
import { GameDisaptch, GameStateType } from "./GameStore";

export const useGameDispatch = useDispatch.withTypes<GameDisaptch>();
export const useGameSelector = useSelector.withTypes<GameStateType>();