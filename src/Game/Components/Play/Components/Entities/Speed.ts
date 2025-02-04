import { Level } from "../../../../Entities/Enums/Level";

export const Speed: { [key: string]: number } = {
    [Level[Level.Easy]]: 1500,
    [Level[Level.Medium]]: 1000,
    [Level[Level.FuckHard]]: 500,
};