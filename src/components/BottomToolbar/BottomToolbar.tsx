// import { version } from '../../../package.json';
import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    isProcessesVisible: boolean;
    toggleProcessesVisible(): void;

    isTerminalPinned: boolean;
    toggleTerminalPinned(): void;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { isProcessesVisible, toggleProcessesVisible, isTerminalPinned, toggleTerminalPinned } = props;

    return (
        <div className={styles.BottomToolbar}>
            <div className={styles.floatLeft}>
                <BottomToolbarButton
                    direction={isProcessesVisible ? 'LEFT' : 'RIGHT'}
                    onClick={toggleProcessesVisible}
                />
            </div>

            <div className={styles.floatRight}>
                <BottomToolbarButton direction={'DOWN'} isClosed={isTerminalPinned} onClick={toggleTerminalPinned} />
            </div>
            {/* TODO: <div className={styles.floatRight}>{`v${version}`} </div> */}
        </div>
    );
}
