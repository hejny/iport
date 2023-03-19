import { ServerConnector } from '@/model/interfaces/10-ServerConnector';
import styles from './StartModal.module.css';

interface StartModalProps {
    serverConnector: ServerConnector;
}

export function StartModal(props: StartModalProps) {
    const { serverConnector } = props;

    return (
        <div
            className={styles.StartModal}
            dangerouslySetInnerHTML={{ __html: serverConnector.newProcessOptions }}
        ></div>
    );
}
