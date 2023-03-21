// import { version } from '../../../package.json';
import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    isprocesses Visible: boolean;
    toggleprocesses Visible(): void;

    isTerminalPinned: boolean;
    toggleTerminalPinned(): void;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { isprocesses Visible, toggleprocesses Visible, isTerminalPinned, toggleTerminalPinned } = props;

    return (
        <div className={styles.BottomToolbar}>
            <div className={styles.floatLeft}>
                <BottomToolbarButton
                    direction={isprocesses Visible ? 'LEFT' : 'RIGHT'}
                    onClick={toggleprocesses Visible}
                />
            </div>

            <div className={styles.floatRight}>
                <BottomToolbarButton direction={'DOWN'} isClosed={isTerminalPinned} onClick={toggleTerminalPinned} />
            </div>
            {/* TODO: <div className={styles.floatRight}>{`v${version}`} </div> */}
        </div>
    );
}
