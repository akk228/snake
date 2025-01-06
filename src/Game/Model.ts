import { Level } from "./Enums/Level";
import { IFieldParameters } from "./Field";

interface IGameModel {
    fieldConfigs: IFieldParameters,
    snakeSpeed: number,
    difficulty: Level
}

export default IGameModel;