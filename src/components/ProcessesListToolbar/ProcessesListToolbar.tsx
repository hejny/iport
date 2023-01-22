import styles from './ProcessesListToolbar.module.css';

interface ProcessesListToolbarProps {
    foo?: string;
}

export function ProcessesListToolbar(props: ProcessesListToolbarProps) {
    const { foo } = props;
    return <div className={styles.ProcessesListToolbar}>{foo}</div>;
}
