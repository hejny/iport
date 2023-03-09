import styles from './StartModal.module.css';

interface StartModalProps {
    foo?: string;
}

export function StartModal(props: StartModalProps) {
    const { foo } = props;
    return <div className={styles.StartModal}>StartModal{foo}</div>;
}
