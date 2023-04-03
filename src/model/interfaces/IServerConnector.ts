import { Observable } from 'rxjs';
import { Promisable } from 'type-fest';
import { IInputData, IProcessId, IServerHtmlWithInput } from './common';
import { IServerProcess } from './IServerProcess';

/**
 * Object that represents connection to server which controlls the app
 */
export interface IServerConnector {
    /**
     * Available information about running processes
     * Every update(next) of the observable will fully update the process list.
     *
     * Note: This does not contain full information about the process, only the info for menu, to get full info use getProcessById
     */
    processes: Observable<Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>>;
    /**
     * Get any process by its ID
     *
     * @param processId - ID of the process to get
     * @returns Process object with the specified ID
     */
    getProcessById(processId: IProcessId): Promisable<IServerProcess>;

    /**
     * Object containing HTML from the server with input data for creating a new process.
     * The HTML may be used as a form for inputting data for a new process.
     */
    getNewProcessOptionsForm(): Promisable<IServerHtmlWithInput>;

    /**
     * Sends input data for creating a new process to the server and returns the ID of the new process.
     *
     * If the receive fails, it throws an Error (rejects the promise).
     *
     * @param input - Object containing input data from the form (or one of forms) specified in getNewProcessOptionsForm
     * @returns Promise that resolves with the ID of the new process
     */
    startNewProcess(input: IInputData): Promisable<IProcessId>;
}
