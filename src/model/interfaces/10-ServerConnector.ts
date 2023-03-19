import { Observable } from 'rxjs';
import { InputData, ProcessId, ServerHtmlWithInput } from './00-common';
import { Process } from './20-Process';

/**
 * Object that represents connection to server which controlls the app
 */
export interface ServerConnector {
    /**
     * Available running processes
     * Every update(next) of the observable will fully update the process list.
     *
     * !!! Rename to processes
     */
    processList: Observable<Array<Process>>;

    /**
     * Get any process by its ID
     */
    getProcessById(processId: ProcessId): Process;

    /**
     * !!!
     */
    newProcessOptions: ServerHtmlWithInput;

    /**
     * !!!
     *
     * If the recive fails it throws an Error (rejects the promise)
     *
     * !!! param + return
     */
    recieveNewProcessOptions(input: InputData): Promise<ProcessId>;
}
