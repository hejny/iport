import { Inter } from '@next/font/google';
import '../app/reset.css';
import { App } from '../components/App/App';
import styles from './index.module.css' /* <- TODO: Where whould be this file and from where it should be imported? */;

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
