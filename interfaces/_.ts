import { IServerProcess } from '@/model/interfaces/IServerProcess';
import { IProcessId } from '@/model/interfaces/common';

export interface Socket_Response_newProcess {
    processId: IProcessId;
}

export type Socket_Event_processes = Array<Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'>>;

/**
 * TODO: !!! Annotate
 * TODO: !!! Make every type
 * TODO: !!! Break apart
 */
