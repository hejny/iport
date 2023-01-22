import { BottomToolbarButton } from '../BottomToolbarButton/BottomToolbarButton';
import styles from './BottomToolbar.module.css';

interface BottomToolbarProps {
    foo?: string;
}

export function BottomToolbar(props: BottomToolbarProps) {
    const { foo } = props;
    return (
        <div className={styles.BottomToolbar}>
            <BottomToolbarButton />
            <BottomToolbarButton />
        </div>
    );
}

/**
 * TODO: HTML Semantics: Use <footer/>
 */
