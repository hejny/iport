import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { IProcessId, IServerHtml, IServerHtmlWithInput } from '@/model/interfaces/common';

/**
 * Type for Socket_Request_startNewProcess ⁘
 */
export type Socket_Request_startNewProcess = unknown;

/**
 * Interface for Socket_Response_newProcess ⁘
 */
export interface Socket_Response_newProcess {
    processId: IProcessId;
}
/**
 * Interface for Socket_Error_newProcess ⁘
 */
export interface Socket_Error_newProcess {
    errorMessage: string;
}

/**
 * Type for Socket_Event_processes ⁘
 */
export type Socket_Event_processes = Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>;
/**
 * Type for Socket_Event_newProcessOptionsForm ⁘
 */
export type Socket_Event_newProcessOptionsForm = IServerHtmlWithInput;

/**
 * Interface for Socket_Request_getProcessById ⁘
 */
export interface Socket_Request_getProcessById {
    processId: IProcessId;
}

/**
 * Interface for Socket_Response_getProcessById ⁘
 */
export interface Socket_Response_getProcessById {
    processTitle: string;
    menuItem: IServerHtml;
}

/**
 * Interface for Socket_Request_recieveInput ⁘
 */
export interface Socket_Request_recieveInput {
    processId: IProcessId;
    input: unknown;
}

/**
 * Interface for Socket_Subscribe_LogsAndInputFrom ⁘
 */
export interface Socket_Subscribe_LogsAndInputFrom {
    processId: IProcessId;
}

/**
 * Interface for Socket_Event_newLogs ⁘
 */
export interface Socket_Event_newLogs {
    logs: Array<IServerHtml>;
}

/**
 * Interface for Socket_Event_inputForm ⁘
 */
export interface Socket_Event_inputForm {
    inputForm: IServerHtmlWithInput;
}

/**
 * TODO: @@@ Annotate
 * Note: I Have not used Socket.IO Acknowledgements @@@
 */
