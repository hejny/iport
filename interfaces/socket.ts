import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { IInputData, IProcessId, IServerHtml, IServerHtmlWithInput } from '@/model/interfaces/common';

/**
 * Event which will be initially send to every connected client which will define shape of the new process form
 */
export type Socket_Event_newProcessOptionsForm = IServerHtmlWithInput;

/**
 * Request to start a new process, the shape of data is defined by shape of the <form> elements in Socket_Event_newProcessOptionsForm
 */
export type Socket_Request_startNewProcess = IInputData;

/**
 * Information about the newly created process
 */
export interface Socket_Response_newProcess {
    processId: IProcessId;
}
/**
 * Information about error in creating new process
 */
export interface Socket_Error_newProcess {
    errorMessage: string;
}

/**
 * List of all running processes
 *
 * Note: This is send from server everytime processes changes
 * Note: This is also send initially
 */
export type Socket_Event_processes = Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>;

/**
 * Get more detailed info about the process
 */
export interface Socket_Request_getProcessById {
    processId: IProcessId;
}

/**
 * Get more detailed info about the process
 */
export interface Socket_Response_getProcessById {
    processTitle: string;
    menuItem: IServerHtml;
}

/**
 * Send new terminal input to server
 * Note: input shape is defined by shape of the <form> elements in Socket_Event_inputForm
 */
export interface Socket_Request_recieveInput {
    processId: IProcessId;
    input: IInputData;
}

/**
 * Subscribe for new logs and changes in input form
 * - `logs` will be send in parst, new logs are added to old ones
 * - `inputForm` will update whole existing form
 */
export interface Socket_Subscribe_LogsAndInputFrom {
    processId: IProcessId;
}

/**
 * Server is sending new logs
 */
export interface Socket_Event_newLogs {
    logs: Array<IServerHtml>;
}

/**
 * Server is updating a form
 *
 * Note: if you want to hide a form, send empty string
 */
export interface Socket_Event_inputForm {
    inputForm: IServerHtmlWithInput;
}

/**
 * Note: I Have not used Socket.IO Acknowledgements BUT flat structure because of type of this app (I can explain)
 */
