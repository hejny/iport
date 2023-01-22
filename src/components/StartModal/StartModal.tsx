import styles from './StartModalInput.module.css';

interface StartModalInputProps {
    foo?: string;
}

export function StartModalInput(props: StartModalInputProps) {
    const { foo } = props;
    return <div className={styles.StartModalInput}>StartModalInput{foo}</div>;
}
