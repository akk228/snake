import { SubmitButton } from "../../../../GlobalElements/UI/Buttons/SubmitButton";

interface IDeathScreenProps {
    onGameRestart: () => void;
}

export function DeathScreen({ onGameRestart }: IDeathScreenProps): JSX.Element {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            color: 'white'
        }}>
            <h2>Game Over!</h2>
            <SubmitButton 
                text="Try Again" 
                onClick={onGameRestart}
                tabIndex={-1}
            />
        </div>
    );
}



