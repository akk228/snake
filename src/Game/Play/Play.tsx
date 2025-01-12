import { useGameSelector } from "../Redux/GameHooks";
import { selectDifficulty, selectFieldConfigs } from "../Redux/GameSelectors";
import { Level } from "../Entities/Enums/Level";

export function Play(): JSX.Element {
    const field = useGameSelector(selectFieldConfigs);
    const difficulty = useGameSelector(selectDifficulty);

    return (
        <div>
            <p>Height: {field.height}</p>
            <p>Width: {field.width}</p>
            <p>Level: <code>{Level[difficulty]}</code></p>
        </div>);
}