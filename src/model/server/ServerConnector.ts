import {
    Socket_Error_newProcess,
    Socket_Event_processes,
    Socket_Request_getProcessById,
    Socket_Request_startNewProcess,
    Socket_Response_getProcessById,
    Socket_Response_newProcess,
} from 'interfaces/_';
import { BehaviorSubject } from 'rxjs';
import SocketIO from 'socket.io-client';
import { IServerConnector } from '../interfaces/IServerConnector';
import { IInputData, IProcessId, IServerHtmlWithInput, IServerProcess } from '../interfaces/common';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';
import { ServerProcess } from './ServerProcess';

export class ServerConnector implements IServerConnector {
    public processes = new BehaviorSubject<Socket_Event_processes>([]);
    private socketClient: SocketIO.Socket;

    public constructor(public readonly apiUrl: URL) {
        this.socketClient = SocketIO.io(this.apiUrl.href, {
            transports: ['websocket', 'polling'],
        });

        this.newProcessOptionsForm = new Promise((resolve) => {
            this.socketClient.on('newProcessOptionsForm', (newProcessOptionsForm: string) => {
                resolve(checkServerHtmlWithInput(newProcessOptionsForm));
            });
        });

        this.socketClient.on('processes', (processes: Socket_Event_processes) => {
            this.processes.next(processes);
        });
    }

    public getProcessById(processId: IProcessId): Promise<IServerProcess> {
        this.socketClient.emit('getProcessById', { processId } satisfies Socket_Request_getProcessById);
        return new Promise((resolve) => {
            // !!! Use once NOT on
            this.socketClient.on('getProcessById', ({ processTitle, menuItem }: Socket_Response_getProcessById) => {
                resolve(new ServerProcess(this.socketClient, processId, processTitle, menuItem));
            });
        });
    }

    private newProcessOptionsForm: Promise<IServerHtmlWithInput>;
    public async getNewProcessOptionsForm(): Promise<IServerHtmlWithInput> {
        return await this.newProcessOptionsForm;
    }

    public async startNewProcess(input: IInputData): Promise<IProcessId> {
        this.socketClient.emit('startNewProcess', input satisfies Socket_Request_startNewProcess);
        return new Promise((resolve, reject) => {
            // !!! Use once NOT on
            this.socketClient.on('newProcess', (newProcess: Socket_Response_newProcess | Socket_Error_newProcess) => {
                if ('processId' in newProcess) {
                    resolve(newProcess.processId);
                } else if ('errorMessage' in newProcess) {
                    reject(new Error(newProcess.errorMessage));
                } else {
                    reject(new Error(`Unknown error`));
                }
            });
        });
    }
}
