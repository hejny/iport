import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
import { forTime } from 'waitasecond';
import { IInputData, IProcessId } from '../interfaces/common';
import { IServerConnector } from '../interfaces/IServerConnector';
import { IServerProcess } from '../interfaces/IServerProcess';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';
import { MockedServerProcess } from './MockedServerProcess';

export class MockedServerConnector implements IServerConnector {
    public constructor() {
        /* not await */ this.startMockedProcesses();
    }

    public getProcessById(processId: IProcessId) {
        return new MockedServerProcess(processId);
    }

    public getNewProcessOptionsForm() {
        return checkServerHtmlWithInput(`
        
            <form>
                <label>
                    Start process ID:
                    <input type="text" name="processId"/>
                </label>

                <label>
                    Start process named:
                    <input type="text" name="processTitle"/>
                </label>

                <input type="submit" value="Start"/>
                
            </form>

            <form>
                <input type="hidden" name="processId" value="foo"/>
                <input type="hidden" name="processTitle" value="Foo"/>
                <input type="submit" value="Start foo"/>
            </form>

            <form>
                <input type="hidden" name="processId" value="bar"/>
                <input type="hidden" name="processTitle" value="Bar"/>
                <input type="submit" value="Start bar"/>
            </form>
            
        `);
    }

    public async recieveNewProcessOptions(input: IInputData): Promise<IProcessId> {
        // !!! Make processTitle and processId different
        this.newProcess(new MockedServerProcess(input.processTitle));
        return input.processId;
    }

    public processes = new BehaviorSubject<Array<IServerProcess>>([]);

    private newProcess(process: IServerProcess) {
        // TODO: Maybe recycle old array object and just push into it
        this.processes.next([...this.processes.value, process]);
    }

    private async startMockedProcesses() {
        this.newProcess(new MockedServerProcess(`first`));

        while (true) {
            await forTime(1000 * (60 * Math.random()) /* <- TODO: Tweak time */);

            this.newProcess(new MockedServerProcess(faker.hacker.verb()));
        }
    }
}
