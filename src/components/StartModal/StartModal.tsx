import { InputData } from '@/model/interfaces/00-simple';
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
            ref={(element) => {
                if (!element) {
                    return;
                }

                for (const formElement of Array.from(element.querySelectorAll('form'))) {
                    if (formElement.dataset.iportActive === '1') {
                        continue;
                    }
                    formElement.dataset.iportActive = '1';
                    formElement.addEventListener('submit', async (event) => {
                        event.preventDefault();

                        const formData = new FormData(formElement);
                        const data = Object.fromEntries(formData);

                        try {
                            const processId = await serverConnector.recieveNewProcessOptions(data as InputData);

                            const url = new URL(window.location.href);
                            url.hash = '#' + processId.toString();

                            window.open(url, processId.toString());

                            formElement.reset();
                        } catch (error) {
                            if (!(error instanceof Error)) {
                                throw error;
                            }

                            console.error(error);
                            alert(error.message);
                        }
                    });
                }
            }}
        ></div>
    );
}
