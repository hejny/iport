import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { IProcessId, IServerHtml, IServerHtmlWithInput } from '@/model/interfaces/common';

export type Socket_Request_startNewProcess = unknown;

export interface Socket_Response_newProcess {
    processId: IProcessId;
}
export interface Socket_Error_newProcess {
    errorMessage: string;
}

export type Socket_Event_processes = Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>;

export interface Socket_Request_getProcessById {
    processId: IProcessId;
}

export interface Socket_Response_getProcessById {
    processTitle: string;
    menuItem: IServerHtml;
}

export interface Socket_Request_recieveInput { processId: IProcessId; input: unknown };

export interface Socket_Subscribe_LogsAndInputFrom {
    processId: IProcessId;
}

export interface Socket_Event_newLogs {
    logs: Array<IServerHtml>;
}

export interface Socket_Event_inputForm {
    inputForm: IServerHtmlWithInput;
}

/**
 * TODO: !!! Order
 * TODO: !!! Annotate
 * TODO: !!! Make every type emited from socket
 * TODO: !!! Break apart
 */
