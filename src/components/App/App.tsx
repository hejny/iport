import { BottomToolbar } from '../BottomToolbar/BottomToolbar';
import { ProcessTerminal } from '../ProcessTerminal/ProcessTerminal';
import { ProcessesList } from '../ProcessesList/ProcessesList';
import styles from './App.module.css';

interface AppProps {
    foo?: string;
}

export function App(props: AppProps) {
    const { foo } = props;
    return (
        <main className={styles.App}>
            <nav className={styles.ProcessesList}>
                <ProcessesList />
            </nav>
            <main className={styles.ProcessTerminal}>
                <ProcessTerminal />
            </main>
            <footer className={styles.BottomToolbar}>
                <BottomToolbar />
            </footer>
        </main>
    );
}
