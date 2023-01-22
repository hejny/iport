import { ProcessTerminalInput } from '../ProcessTerminalInput/ProcessTerminalInput';
import styles from './ProcessTerminal.module.css';

interface ProcessTerminalProps {
    foo?: string;
}

export function ProcessTerminal(props: ProcessTerminalProps) {
    const { foo } = props;
    return (
        <div className={styles.ProcessTerminal}>
            {foo}
            <ProcessTerminalInput />
        </div>
    );
}
