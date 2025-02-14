import { useEffect } from "react";
import { KeyCode } from "../Components/Entities/GameEnums";
import { Speed } from "../Components/Entities/Speed";
import { SnakeActionType } from "../SnakeState/SnakeReducers";
import { Direction } from "../Components/Entities/Direction";
import { Level } from "../../../Entities/Enums/Level";

export function usePauseResume (callback: () => void, enabled: boolean): void {
    useEffect(() => {
        if (!enabled) {
            return;
        }
        console.log('usePauseResume');
        const handlePauseResume = (event: KeyboardEvent) => {
            if (event.code !== KeyCode.Space) {
                return;
            }
    
            event.preventDefault();
            callback();
        }
    
        document.addEventListener('keydown', handlePauseResume);
        return () => document.removeEventListener('keydown', handlePauseResume);
    }, [enabled, callback]);
}

export function useGameLoop(
    gameOn: boolean,
    isMoving: boolean,
    difficulty: Level,
    directionQueue: React.MutableRefObject<Direction[]>,
    dispatchSnake: React.Dispatch<any>
) {
    useEffect(() => {
        if (!gameOn || !isMoving) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (!(event.code.startsWith(KeyCode.ArrowPrefix))) {
                return;
            }

            const newDirection = event.code.substring(KeyCode.ArrowPrefix.length) as Direction;
            directionQueue.current.push(newDirection);
        };

        document.addEventListener('keydown', handleKeyDown);

        let frameId: number;
        let lastTime = 0;
        const interval = Speed[difficulty];

        const gameLoop = (timestamp: number) => {
            const delta = timestamp - lastTime;

            if (delta >= interval) {
                const currentDirections = [...directionQueue.current];
                dispatchSnake({ 
                    type: SnakeActionType.Move, 
                    payload: currentDirections 
                });
                if (directionQueue.current.length > 0) {
                    directionQueue.current.shift();
                }
                lastTime = timestamp;
            }
            
            if (delta > 3*interval) {
                dispatchSnake({ type: SnakeActionType.AddObstacle})
            }

            frameId = requestAnimationFrame(gameLoop);
        };

        frameId = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(frameId);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [gameOn, isMoving, difficulty, directionQueue, dispatchSnake]);
}