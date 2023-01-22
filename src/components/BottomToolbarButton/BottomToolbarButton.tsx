import styles from './BottomToolbarButton.module.css';

interface BottomToolbarButtonProps {
    foo?: string;
}

export function BottomToolbarButton(props: BottomToolbarButtonProps) {
    const { foo } = props;
    return <div className={styles.BottomToolbarButton}>{foo}</div>;
}
