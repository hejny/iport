import { Observable } from 'rxjs';
import { Process } from './20-Process';

/**
 * Object that represents connection to server which controlls the app
 */
export interface ServerConnector {
    /**
     * Available running processes
     * Every update(next) of the observable will fully update the process list.
     */
    processList: Observable<Array<Process>>;

    /**
     * Get any process by its ID
     */
    getProcessById(processId: string | number): Process;
}

/**
 * TODO: !!! newProcessOptions
 */
