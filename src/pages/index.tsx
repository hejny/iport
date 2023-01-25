import { Inter } from '@next/font/google';
import { App } from '../components/App/App';
import styles from './index.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <div className={styles.App}>
            <App />
        </div>
    );
}

/**
 * Note: This was orininally generated into /src/app/page.tsx - BUT then there was error in the compilation
 */
