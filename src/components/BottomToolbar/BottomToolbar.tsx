import { version } from '../../../package.json';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    isProcessListVisible: boolean;
    toggleProcessListVisible(): void;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { isProcessListVisible, toggleProcessListVisible } = props;

    const [isTerminalPinned, toggleTerminalPinned] = useToggle(false);

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
            <div className={styles.floatRight}>{`v${version}`} </div>
        </div>
    );
}
