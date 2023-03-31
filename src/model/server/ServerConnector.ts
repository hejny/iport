import { faker } from '@faker-js/faker';
import { Response_newProcess } from 'interfaces/_';
import { BehaviorSubject } from 'rxjs';
import SocketIO from 'socket.io-client';
import { forTime } from 'waitasecond';
import { IServerConnector } from '../interfaces/IServerConnector';
import { IServerProcess } from '../interfaces/IServerProcess';
import { IInputData, IProcessId, IServerHtmlWithInput } from '../interfaces/common';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';

export class ServerConnector implements IServerConnector {
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
    }

    public getProcessById(processId: IProcessId) {}

    private newProcessOptionsForm: Promise<IServerHtmlWithInput>;
    public async getNewProcessOptionsForm() {
        return await this.newProcessOptionsForm;
    }

    public async startNewProcess(input: IInputData): Promise<IProcessId> {
        this.socketClient.emit('startNewProcess', input);

        return new Promise((resolve) => {
            this.socketClient.on('newProcess', ({ processId }: Response_newProcess) => {
                resolve(processId);
            });
        });
    }

    public processes = new BehaviorSubject<Array<IServerProcess>>([]);

    private newProcess(process: IServerProcess) {
        // TODO: Maybe recycle old array object and just push into it
        this.processes.next([...this.processes.value, process]);
    }

    public async startMockedProcesses() {
        this.newProcess(new MockedProcess(`first`));

        while (true) {
            await forTime(1000 * (60 * Math.random()) /* <- TODO: Tweak time */);

            this.newProcess(new MockedProcess(faker.hacker.verb()));
        }
    }
}
