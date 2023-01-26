import { classNames } from '@/utils/classNames';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbar } from '../BottomToolbar/BottomToolbar';
import { ProcessTerminal } from '../ProcessTerminal/ProcessTerminal';
import { ProcessesList } from '../ProcessesList/ProcessesList';
import styles from './App.module.css';

interface AppProps {}

export function App(props: AppProps) {
    const [isProcessListVisible, toggleProcessListVisible] = useToggle(true);

    return (
        <main
            className={classNames(
                styles.App,
                styles[isProcessListVisible ? 'with-process-list' : 'without-process-list'],
            )}
        >
            {isProcessListVisible && (
                <nav className={styles.ProcessesList}>
                    <ProcessesList />
                </nav>
            )}
            <main className={styles.ProcessTerminal}>
                <ProcessTerminal />
            </main>
            <footer className={styles.BottomToolbar}>
                <BottomToolbar {...{ isProcessListVisible, toggleProcessListVisible }} />
            </footer>
        </main>
    );
}
