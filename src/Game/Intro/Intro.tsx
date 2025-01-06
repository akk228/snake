import React from "react";
import { IFieldParameters } from "../Field";
import { StartButton } from "../ControlButtons/StartButton";
import { GameConfigs } from "./GameConfigs";
import IGameModel from "../Model";

interface IIntroProps {
    gameStarted: boolean,
    gameConfigs: IGameModel,
    onGameConfigsChange: (val: IGameModel) => void,
    onGameStartedChange: (val: boolean) => void
}

/**
 * Form that opens before starting the game, that is used to set game parameters, and start the game
 * @param props IFieldParameters
 * @returns 
 */
export function Intro(props: IIntroProps): JSX.Element {
    function renderIntro(): JSX.Element {
        return (
            <>
                <StartButton
                    onStart={() => props.onGameStartedChange(true)}
                />
                <GameConfigs
                    gameConfigs={props.gameConfigs}
                    onGameConfigsChange={props.onGameConfigsChange}
                />
            </>);
    }

    return props.gameStarted ? <></> : renderIntro();
}