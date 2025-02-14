import { useEffect } from "react";
import { KeyCode } from "../Components/Entities/GameEnums";

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