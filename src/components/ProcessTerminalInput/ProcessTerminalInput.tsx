import styles from './ProcessTerminalInput.module.css';

interface ProcessTerminalInputProps {
    foo?: string;
}

export function ProcessTerminalInput(props: ProcessTerminalInputProps) {
    const { foo } = props;
    return (
        <div className={styles.ProcessTerminalInput}>
            <input type={'text'} defaultValue={''} placeholder="Write your answer" />
            <br />
            <input type={'submit'} value={'Send'} />
        </div>
    );
}
