import { MockedServerConnector } from '@/model/mock/MockedServerConnector';
import { classNames } from '@/utils/classNames';
import { useProcessId } from '@/utils/hooks/useProcessId';
import { useEffect, useMemo } from 'react';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbar } from '../BottomToolbar/BottomToolbar';
import { ProcessTerminal } from '../ProcessTerminal/ProcessTerminal';
import { ProcessesList } from '../ProcessesList/ProcessesList';
import { StartModal } from '../StartModal/StartModal';
import styles from './App.module.css';

interface AppProps {}

export function App(props: AppProps) {
    const [isProcessesVisible, toggleProcessesVisible] = useToggle(true);
    const [isTerminalPinned, toggleTerminalPinned] = useToggle(false);

    const processId = useProcessId();
    const serverConnector = useMemo(() => {
        // TODO: Pass it (probbably) via React context
        return new MockedServerConnector();
        // !!! return new ServerConnector(SERVER_URL);
    }, []);

    const serverProcess = !processId ? null : serverConnector.getProcessById(processId);

    useEffect(() => {
        // TODO: Do outside of component probbably IN custom hook
        // TODO: changeFavicon(processStatusFaviconUrl);

        if (!serverProcess) {
            return;
        }

        window.document.title = serverProcess.processTitle;
    });

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
                {!serverProcess ? (
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
