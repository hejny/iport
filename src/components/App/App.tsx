import { MockedProcess } from '@/model/_';
import { classNames } from '@/utils/classNames';
import { string_url_image } from '@/utils/typeAliases';
import { useEffect, useMemo } from 'react';
import iconA from '../../../public/a.ico';
import iconB from '../../../public/b.ico';
import iconC from '../../../public/c.ico';
import { useToggle } from '../../utils/hooks/useToggle';
import { BottomToolbar } from '../BottomToolbar/BottomToolbar';
import { ProcessTerminal } from '../ProcessTerminal/ProcessTerminal';
import { ProcessesList } from '../ProcessesList/ProcessesList';
import styles from './App.module.css';

interface AppProps {}

// TODO: Extract as util
// TODO: This is not working in most of the browsers
function changeFavicon(url: string_url_image) {
    // TODO: Enhance
    let linkElement: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

    console.log({ linkElement });

    if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.rel = 'icon';
        document.head.appendChild(linkElement);
    }
    linkElement.href = url;
}

export function App(props: AppProps) {
    const [isProcessListVisible, toggleProcessListVisible] = useToggle(true);

    useEffect(() => {
        // TODO: !!! Better + do in other place outside of component
        const processName = window.location.hash.substring(1).toUpperCase();
        const processStatusFaviconUrl = (() => {
            // TODO: !!! Better
            return (
                {
                    A: iconA,
                    B: iconB,
                    C: iconC,
                }[processName] || iconA
            ).src;
        })();

        const processStatusChar = (() => {
            // TODO: !!! Better
            return (
                {
                    A: '⬜',
                    B: '🟥',
                    C: '🟩',
                }[processName] || '⬜'
            );
        })();

        changeFavicon(processStatusFaviconUrl);
        window.document.title = `${processStatusChar} Proces ${processName}`;
    });

    // TODO: !!! Better + do in other place outside of component
    // TODO: !!! Better + do it (probbably) via React context
    const process = useMemo(() => {
        return new MockedProcess();
    }, []);

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
                <ProcessTerminal {...{ process }} />
            </main>
            <footer className={styles.BottomToolbar}>
                <BottomToolbar {...{ isProcessListVisible, toggleProcessListVisible }} />
            </footer>
        </main>
    );
}
