import styles from './ProcessesList.module.css';

interface ProcessesListProps {
    foo?: string;
}

export function ProcessesList(props: ProcessesListProps) {
    const { foo } = props;
    return (
        <div className={styles.ProcessesList}>
            <h2>Seznam procesů: </h2>
            <ul>
                {/* TODO: This will be in data model */}
                <li>
                    <a href="#a" target="a">
                        Open A
                    </a>
                </li>
                <li>
                    <a href="#b" target="b">
                        Open B
                    </a>
                </li>
                <li>
                    <a href="#c" target="c">
                        Open C
                    </a>
                </li>
            </ul>
        </div>
    );
}

/**
 * TODO: Use <ul/> + li
 * TODO: ACRY replace foo prop
 */
