import { useState } from "react";
import { FieldConfigs } from "./GameConfigs/FieldConfigs";
import { LevelConfigs } from "./GameConfigs/LevelConfigs";


export function GameConfigs(): JSX.Element {
    return (
        <>
            <FieldConfigs />
            <LevelConfigs />
        </>
    );
}