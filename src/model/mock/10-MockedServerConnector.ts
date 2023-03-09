import { faker } from '@faker-js/faker';
import { Registration } from 'destroyable';
import { Observable } from 'rxjs';
import { forTime } from 'waitasecond';
import { ServerConnector } from '../interfaces/10-ServerConnector';
import { Process } from '../interfaces/20-Process';
import { MockedProcess } from './20-MockedProcess';

export class MockedServerConnector implements ServerConnector {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version
    public getProcessById(processId: string | number) {
        return new MockedProcess(processId);
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
