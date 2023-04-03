import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { ServerConnector } from '@/model/server/ServerConnector';
import { classNames } from '@/utils/classNames';
import { useProcessId } from '@/utils/hooks/useProcessId';
import { usePromise } from '@/utils/hooks/usePromise';
import { SERVER_URL } from 'config';
import { useEffect, useMemo } from 'react';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbar } from '../BottomToolbar/BottomToolbar';
import { ProcessesList } from '../ProcessesList/ProcessesList';
import { ProcessTerminal } from '../ProcessTerminal/ProcessTerminal';
import { StartModal } from '../StartModal/StartModal';
import styles from './App.module.css';

interface AppProps {}

export function App(props: AppProps) {
    const [isProcessesVisible, toggleProcessesVisible] = useToggle(true);
    const [isTerminalPinned, toggleTerminalPinned] = useToggle(false);

    const processId = useProcessId();
    const serverConnector = useMemo(() => {
        // TODO: Pass it (probbably) via React context
        // return new MockedServerConnector();
        return new ServerConnector(SERVER_URL);
    }, []);

    const { value: serverProcess } = usePromise<IServerProcess | 'NO_PROCESS'>(
        processId === null ? Promise.resolve('NO_PROCESS') : serverConnector.getProcessById(processId),
        [processId],
    );

    useEffect(() => {
        // TODO: Do outside of component probbably IN custom hook
        // TODO: changeFavicon(processStatusFaviconUrl);

        if (!serverProcess || serverProcess === 'NO_PROCESS') {
            return;
        }

        window.document.title = serverProcess.processTitle;
    });

    if (!serverProcess) {
        return <>Connecting</>;
    }

    return (
        <main
            className={classNames(
                styles.App,
                styles[isProcessesVisible ? 'with-process-list' : 'without-process-list'],
            )}
        >
            {isProcessesVisible && (
                <nav className={styles.ProcessesList}>
                    <ProcessesList {...{ serverConnector }} />
                </nav>
            )}
            <main className={styles.ProcessTerminal}>
                {serverProcess === 'NO_PROCESS' ? (
                    <StartModal {...{ serverConnector }} />
                ) : (
                    <ProcessTerminal {...{ serverProcess, isTerminalPinned }} />
                )}
            </main>
            <footer className={styles.BottomToolbar}>
                <BottomToolbar
                    {...{ isProcessesVisible, toggleProcessesVisible, isTerminalPinned, toggleTerminalPinned }}
                />
            </footer>
        </main>
    );
}
