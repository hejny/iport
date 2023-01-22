import { Inter } from '@next/font/google';
import { BottomToolbar } from '../components/BottomToolbar/BottomToolbar';
import { ProcessTerminal } from '../components/ProcessTerminal/ProcessTerminal';
import { ProcessesList } from '../components/ProcessesList/ProcessesList';
import styles from './page.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <main className={styles.main}>
            <ProcessesList />
            <ProcessTerminal />
            <BottomToolbar />
        </main>
    );
}

/**
 * TODO: Maybe wrap entipe app in <App/> component
 * TODO: HTML Semantics: Maybe <main/> should be the <ProcessTerminal/> not the entire app
 */
