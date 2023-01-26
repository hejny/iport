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
                        <span className="time">11:10</span>
                        <span className="name">Process A [HA]</span>
                    </a>
                </li>
                <li>
                    <a href="#b" target="b" style={{ color: '#dd0000', fontWeight: 'bold' }}>
                        <span className="time">11:11</span>
                        <span className="name">Process B [MBR]</span>
                    </a>
                </li>
                <li>
                    <a href="#c" target="c" style={{ color: '#00cc22', fontWeight: 'bold' }}>
                        <span className="time">11:23</span>
                        <span className="name">Process C [MCI]</span>
                    </a>
                </li>

                <li>vv--- 17.01 ---------------------------</li>
            </ul>
        </div>
    );
}

/**
 * TODO: Use <ul/> + li
 * TODO: ACRY replace foo prop
 */
