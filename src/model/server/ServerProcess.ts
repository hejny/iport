import {
    Socket_Event_inputForm,
    Socket_Event_newLogs,
    Socket_Request_recieveInput,
    Socket_Subscribe_LogsAndInputFrom,
} from 'interfaces/socket';
import { BehaviorSubject } from 'rxjs';
import SocketIO from 'socket.io-client';
import { IServerProcess } from '../interfaces/IServerProcess';
import { IInputData, IProcessId, IServerHtml, IServerHtmlWithInput } from '../interfaces/common';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';

export class ServerProcess implements IServerProcess {
    public logs = new BehaviorSubject<Array<IServerHtml>>([]);
    public inputForm = new BehaviorSubject<IServerHtmlWithInput>(checkServerHtmlWithInput(``));

    public constructor(
        private socketClient: SocketIO.Socket,
        public readonly processId: IProcessId,
        public readonly processTitle: string,
        public readonly menuItem: IServerHtml,
    ) {
        this.socketClient.emit('subscribeToLogsAndInputFrom', { processId } as Socket_Subscribe_LogsAndInputFrom);
        this.socketClient.on('newLog', ({ logs }: Socket_Event_newLogs) => {
            this.logs.next(
                Array.from(
                    new Set([...this.logs.value, ...logs]),
                ) /* <- TODO: !!! Important note: Messages mus be unique (for example in order) */,
            );
        });
        this.socketClient.on('inputForm', ({ inputForm }: Socket_Event_inputForm) => {
            this.inputForm.next(inputForm);
        });
    }

    public async recieveInput(input: IInputData): Promise<void> {
        this.socketClient.emit('recieveInput', { processId: this.processId, input } as Socket_Request_recieveInput);
    }
}
