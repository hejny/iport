import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { IProcessId, IServerHtml } from '@/model/interfaces/common';

export type Socket_Request_startNewProcess = unknown;
export interface Socket_Response_newProcess {
    processId: IProcessId;
}

export type Socket_Event_processes = Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>;

export interface Socket_Request_getProcessById {
    processId: IProcessId;
}

export interface Socket_Response_getProcessById {
    processTitle: string;
    menuItem: IServerHtml;
}

export interface Socket_Subscribe_LogsAndInputFrom {
    processId: IProcessId;
}

export interface Socket_Event_newLogs {
    logs: Array<IServerHtml>;
}

/**
 * TODO: !!! Order
 * TODO: !!! Annotate
 * TODO: !!! Make every type emited from socket
 * TODO: !!! Break apart
 */
