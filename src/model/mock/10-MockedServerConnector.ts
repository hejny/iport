import { faker } from '@faker-js/faker';
import { Registration } from 'destroyable';
import { Observable } from 'rxjs';
import { forTime } from 'waitasecond';
import { InputData, ProcessId } from '../interfaces/00-common';
import { ServerConnector } from '../interfaces/10-ServerConnector';
import { Process } from '../interfaces/20-Process';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';
import { MockedProcess } from './20-MockedProcess';

export class MockedServerConnector implements ServerConnector {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version
    public getProcessById(processId: ProcessId) {
        return new MockedProcess(processId);
    }

    public newProcessOptions = checkServerHtmlWithInput(`
    
        <form>
            <label>
                Start process named:
                <input type="text" name="processTitle"/>
            </label>

            <input type="submit" value="Start"/>
            
        </form>

        <form>
            <input type="hidden" name="processTitle" value="Foo process"/>
            <input type="submit" value="Start foo"/>
        </form>

        <form>
            <input type="hidden" name="processTitle" value="Bar process"/>
            <input type="submit" value="Start bar"/>
        </form>
        
    `);

    public async recieveNewProcessOptions(input: InputData): Promise<void> {
        // !!! Make active and replay message + color into the logs
    }

    public get processList() {
        return new Observable<Array<Process>>((observer) => {
            // console.log('Observable');
            let processes = [new MockedProcess(`first`)];

            let order = 0;

            // Note: Replay initial logs
            observer.next(processes);

            const registration = Registration.create(async ({ isDestroyed }) => {
                while (true) {
                    await forTime(1000 * (7 * Math.random()) /* <- TODO: Tweak time */);

                    /*
                    if (order > 50) {
                        return;
                    }
                    */
                    if (isDestroyed()) {
                        return;
                    }

                    processes = [...processes, new MockedProcess(faker.hacker.verb())];
                    observer.next(processes);
                }
            });

            return () => registration.destroy();
        });
    }
}
