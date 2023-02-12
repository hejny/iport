import { Process } from '@/model/_';
import { useObservable } from '@/utils/hooks/useObservable';
import { useMemo } from 'react';
import { scan, share } from 'rxjs';
import { ProcessTerminalInput } from '../ProcessTerminalInput/ProcessTerminalInput';
import styles from './ProcessTerminal.module.css';

interface ProcessTerminalProps {
    process: Process;
    isTerminalPinned: boolean;
}

export function ProcessTerminal(props: ProcessTerminalProps) {
    const { process, isTerminalPinned } = props;

    // TODO: Probbably make some util/hook for this and separate component from aggregation logic
    const logsObservable = useMemo(
        () =>
            process.logs.pipe(scan((logs, log) => logs + log /* <- TODO: Template with spacetrim */, '')).pipe(share()),
        [process],
    );

    // TODO: Probbably make some util/hook for this and separate component from aggregation logic
    let { value: logs } = useObservable(logsObservable);

    // console.log('ProcessTerminal', logs);

    if (!logs) {
        // TODO: Do we want some message for empty logs
        logs = '<li><i>No logs yet</i></li>';
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
                    <ul dangerouslySetInnerHTML={{ __html: logs }} />
                </div>
            </div>
            <div className={styles.input}>
                <div className={styles.inner}>
                    <ProcessTerminalInput />
                </div>
            </div>
        </div>
    );
}
