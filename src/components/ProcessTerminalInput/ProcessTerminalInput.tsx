import styles from './ProcessTerminalInput.module.css';

interface ProcessTerminalInputProps {
    foo?: string;
}

export function ProcessTerminalInput(props: ProcessTerminalInputProps) {
    const { foo } = props;
    return <div className={styles.ProcessTerminalInput}></div>;
}
