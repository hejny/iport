import { InputData } from '@/model/interfaces/00-simple';
import { Process } from '@/model/interfaces/20-Process';
import { useObservable } from '@/utils/hooks/useObservable';
import styles from './ProcessTerminalInput.module.css';

interface ProcessTerminalInputProps {
    process: Process;
}

export function ProcessTerminalInput(props: ProcessTerminalInputProps) {
    const { process } = props;

    const { value } = useObservable(process.input);

    if (!value) {
        return <></>;
    }

    return (
        <div
            className={styles.ProcessTerminalInput}
            dangerouslySetInnerHTML={{ __html: value }}
            ref={(element) => {
                if (!element) {
                    return;
                }

                console.log('ref');

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
                            await process.recieveInput(data as InputData);
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
