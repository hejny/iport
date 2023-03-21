import { faker } from '@faker-js/faker';
import { BehaviorSubject } from 'rxjs';
import { forTime } from 'waitasecond';
import { IInputData, IProcessId } from '../interfaces/00-simple';
import { IServerConnector } from '../interfaces/10-IServerConnector';
import { IProcess } from '../interfaces/20-IProcess';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';
import { MockedProcess } from './20-MockedProcess';

export class MockedServerConnector implements IServerConnector {
    public constructor(public readonly processId: IProcessId) {
        /* not await */ this.startMockedProcesses();
    }

    public getProcessById(processId: IProcessId) {
        return new MockedProcess(processId);
    }

    public newProcessOptions = checkServerHtmlWithInput(`
    
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

    public async recieveNewProcessOptions(input: IInputData): Promise<IProcessId> {
        // !!! Make processTitle and processId different
        this.newProcess(new MockedProcess(input.processTitle));
        return input.processId;
    }

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
