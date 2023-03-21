import { IProcess } from '@/model/interfaces/20-IProcess';
import { checkServerHtml } from '@/model/utils/checkServerHtml';
import { useObservable } from '@/utils/hooks/useObservable';
import { ProcessTerminalInput } from '../ProcessTerminalInput/ProcessTerminalInput';
import styles from './ProcessTerminal.module.css';

interface ProcessTerminalProps {
    process: IProcess;
    isTerminalPinned: boolean;
}

export function ProcessTerminal(props: ProcessTerminalProps) {
    const { process, isTerminalPinned } = props;

    // TODO: Probbably make some util/hook for this and separate component from aggregation logic
    let { value: logs } = useObservable(process.logs);

    // console.log('ProcessTerminal', logs);

    if (!logs || logs.length === 0) {
        // TODO: Do we want some message for empty logs
        logs = [checkServerHtml('<li><i>No logs yet</i></li>')];
    }

    return (
        <div className={styles.ProcessTerminal}>
            <div className={styles.output}>
                <div
                    className={styles.inner}
                    ref={(element) => {
                        if (!element) {
                            return;
                        }

                        if (isTerminalPinned) {
                            return;
                        }
                        element.scrollBy(0, 10000);
                    }}
                >
                    <ul>
                        {logs.map((log, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: log }} />
                        ))}
                    </ul>
                </div>
            </div>
            <div className={styles.input}>
                <div className={styles.inner}>
                    <ProcessTerminalInput {...{ process }} />
                </div>
            </div>
        </div>
    );
}
