import { version } from '../../../package.json';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    foo?: string;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { foo } = props;

    // TODO: Maybe to global state
    const [isProcessListVisible, toggleProcessListVisible] = useToggle(true);
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
