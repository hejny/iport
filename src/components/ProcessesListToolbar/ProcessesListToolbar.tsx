import styles from './ProcessesListToolbar.module.css';

interface ProcessesListToolbarProps {
    foo?: string; /* <- TODO: ACRY remove all foo */
}

export function ProcessesListToolbar(props: ProcessesListToolbarProps) {
    const { foo } = props;
    return <div className={styles.ProcessesListToolbar}>ProcessesListToolbar{foo}</div>;
}
