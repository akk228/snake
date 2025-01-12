import { useState } from "react";
import { FieldConfigs } from "./GameConfigs/FieldConfigs";
import { LevelConfigs } from "./GameConfigs/LevelConfigs";


export function GameConfigs(): JSX.Element {
    const [saved, setSaved] = useState(false);
    const onSaveEdit = () => setSaved(!saved);

    return (
        <>
            <button onClick={() => onSaveEdit()}>{saved ? "Edit" : "Save"}</button>
            <fieldset disabled={saved}>
                <FieldConfigs />
                <LevelConfigs />
            </fieldset>
        </>);
}