import { Observable } from 'rxjs';
import { IInputData, IProcessId, IServerHtmlWithInput } from './00-simple';
import { IProcess } from './20-IProcess';

/**
 * Object that represents connection to server which controlls the app
 */
export interface IServerConnector {
    /**
     * Available running processes
     * Every update(next) of the observable will fully update the process list.
     */
    processes: Observable<Array<IProcess>>;

    /**
     * Get any process by its ID
     *
     * @param processId - ID of the process to get
     * @returns Process object with the specified ID
     */
    getProcessById(processId: IProcessId): IProcess;

    /**
     * Object containing HTML from the server with input data for creating a new process.
     * The HTML may be used as a form for inputting data for a new process.
     */
    newProcessOptions: IServerHtmlWithInput;

    /**
     * Sends input data for creating a new process to the server and returns the ID of the new process.
     *
     * If the receive fails, it throws an Error (rejects the promise).
     *
     * @param input - Object containing input data
     * @returns Promise that resolves with the ID of the new process
     */
    recieveNewProcessOptions(input: IInputData): Promise<IProcessId>;
}
