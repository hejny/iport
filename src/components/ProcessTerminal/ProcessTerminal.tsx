import { ProcessTerminalInput } from '../ProcessTerminalInput/ProcessTerminalInput';
import styles from './ProcessTerminal.module.css';

interface ProcessTerminalProps {
    foo?: string;
}

export function ProcessTerminal(props: ProcessTerminalProps) {
    const { foo } = props;
    return (
        <div className={styles.ProcessTerminal}>
            <div className={styles.output}>
                <ul>
                    {/* TODO: This will be in data model */}
                    <li>
                        <span className="order">0</span>
                        <span className="time">11:10</span>
                        <span className="log">- Hello here is the sample LOG</span>
                    </li>
                    <li>
                        <span className="order">1</span>
                        <span className="time">11:15</span>
                        <span className="log">
                            - Roses are <span style={{ color: 'red' }}>red</span>
                        </span>
                    </li>
                    <li>
                        <span className="order">2</span>
                        <span className="time">11:20</span>
                        <span className="log">
                            - Violets are <span style={{ color: 'blue' }}>blue</span>
                        </span>
                    </li>
                    <li>
                        <span className="order">3</span>
                        <span className="time">11:25</span>
                        <span className="log">
                            - We <span style={{ fontWeight: 'bold' }}>italic</span> make logs{' '}
                            <span style={{ fontStyle: 'italic' }}>italic</span> too!
                        </span>
                    </li>
                    <li>
                        <span className="order">4</span>
                        <span className="time">11:35</span>
                        <span className="log">
                            - And also <a href="https://pavolhejny.com">link</a> with{' '}
                            <span style={{ outline: '2px dotted #0f0' }}>rich</span> html.
                        </span>
                    </li>
                </ul>
            </div>
            <div className={styles.input}>
                <ProcessTerminalInput />
            </div>
        </div>
    );
}
