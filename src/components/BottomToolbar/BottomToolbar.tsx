import { version as appVersion } from '../../../package.json';
import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    isProcessListVisible: boolean;
    toggleProcessListVisible(): void;

    isTerminalPinned: boolean;
    toggleTerminalPinned(): void;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { isProcessListVisible, toggleProcessListVisible, isTerminalPinned, toggleTerminalPinned } = props;

    return (
        <div className={styles.BottomToolbar}>
            <div className={styles.floatLeft}>
                <BottomToolbarButton
                    direction={isProcessListVisible ? 'LEFT' : 'RIGHT'}
                    onClick={toggleProcessListVisible}
                />
            </div>

            <div className={styles.floatRight}>
                <BottomToolbarButton direction={'DOWN'} isClosed={isTerminalPinned} onClick={toggleTerminalPinned} />
            </div>
            <div className={styles.floatRight}>{`v${appVersion}`} </div>
        </div>
    );
}
