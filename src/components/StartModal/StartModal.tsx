import { IInputData } from '@/model/interfaces/common';
import { IServerConnector } from '@/model/interfaces/IServerConnector';
import { usePromise } from '@/utils/hooks/usePromise';
import styles from './StartModal.module.css';

interface StartModalProps {
    serverConnector: IServerConnector;
}

export function StartModal(props: StartModalProps) {
    const { serverConnector } = props;

    const { value: processOptionsForm } = usePromise(serverConnector.getNewProcessOptionsForm(), [serverConnector]);

    return (
        <div
            className={styles.StartModal}
            dangerouslySetInnerHTML={{ __html: processOptionsForm || '' }}
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
                            const processId = await serverConnector.startNewProcess(data as IInputData);

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
