import { Socket_Event_newLogs, Socket_Subscribe_LogsAndInputFrom } from 'interfaces/_';
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
            this.logs.next([...this.logs.value, ...logs]);
        });

        // !!! Same with inputForm
    }

    public async recieveInput(input: IInputData): Promise<void> {}
}
