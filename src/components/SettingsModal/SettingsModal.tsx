import styles from './SettingsModalInput.module.css';

interface SettingsModalInputProps {
    foo?: string;
}

export function SettingsModalInput(props: SettingsModalInputProps) {
    const { foo } = props;
    return <div className={styles.SettingsModalInput}>{foo}</div>;
}


/**
 * TODO: !!! Some data model for settings
 */