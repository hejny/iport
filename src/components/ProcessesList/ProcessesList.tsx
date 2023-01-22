import styles from './ProcessesList.module.css';

interface ProcessesListProps {
    foo?: string;
}

export function ProcessesList(props: ProcessesListProps) {
    const { foo } = props;
    return (
        <div className={styles.ProcessesList}>
            <a href="#a" target="a">
                Open A
            </a>
            <a href="#b" target="b">
                Open B
            </a>
            <a href="#c" target="c">
                Open C
            </a>
        </div>
    );
}

/**
 * TODO: ACRY replace foo prop
 */
