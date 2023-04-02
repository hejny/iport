import { IServerConnector } from '@/model/interfaces/IServerConnector';
import { useObservable } from '@/utils/hooks/useObservable';
import styles from './ProcessesList.module.css';

interface ProcessesListProps {
    serverConnector: IServerConnector;
}

export function ProcessesList(props: ProcessesListProps) {
    const { serverConnector } = props;

    let { value: processes } = useObservable(serverConnector.processes);

    return (
        <div className={styles.ProcessesList}>
            <h2>Seznam procesů: </h2>
            <ul>
                <li>
                    <a href="" target="_blank">
                        <span className="name">New process</span>
                    </a>
                </li>

                {(processes || []).map((process) => (
                    <li key={process.processId} dangerouslySetInnerHTML={{ __html: process.menuItem }} />
                ))}

                {/*
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
                    <a href="#c" target="c" style={{ color: '#008031', fontWeight: 'bold' }}>
                        <span className="time">11:23</span>
                        <span className="name">Process C [MCI]</span>
                    </a>
                </li>

                <li>vv--- 17.01 ---------------------------</li>

                */}
            </ul>
        </div>
    );
}
