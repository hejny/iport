import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
import { forTime } from 'waitasecond';
import { IServerConnector } from '../interfaces/IServerConnector';
import { IServerProcess } from '../interfaces/IServerProcess';
import { IInputData, IProcessId } from '../interfaces/common';

export class ServerConnector implements IServerConnector {
    public constructor(public readonly apiUrl: URL) {}

    public getProcessById(processId: IProcessId) {}

    public getNewProcessOptionsForm() {}

    public async recieveNewProcessOptions(input: IInputData): Promise<IProcessId> {}

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
