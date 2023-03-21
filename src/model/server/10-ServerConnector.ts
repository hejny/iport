import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
import { forTime } from 'waitasecond';
import { IInputData, IProcessId } from '../interfaces/00-simple';
import { IServerConnector } from '../interfaces/10-IServerConnector';
import { IProcess } from '../interfaces/20-IProcess';
import { Process } from './20-Process';

export class ServerConnector implements IServerConnector {
    public constructor(public readonly apiUrl: URL) {}

    public getProcessById(processId: IProcessId) {}

    public getNewProcessOptionsForm() {}

    public async recieveNewProcessOptions(input: IInputData): Promise<IProcessId> {}

    public processes = new BehaviorSubject<Array<IProcess>>([]);

    private newProcess(process: IProcess) {
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
