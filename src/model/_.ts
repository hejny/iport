// TODO: !!! Break into components

import { Registration } from 'destroyable';
import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { string_html } from '../utils/typeAliases';

// !!! Better name
export interface ServerConnector {
    // TODO: !!! newProcessOptions;
    // TODO: !!! processList
}

type ServerHtml = string_html;

export interface Process {
    // TODO: !!! Complete

    logs: Observable<ServerHtml>;
}

export class MockedServerConnector implements ServerConnector {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version
}

export class MockedProcess implements Process {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version

    public get logs() {
        return new Observable<ServerHtml>((observer) => {
            console.log('Observable');

            let order = 0;

            // TODO: Replay initial logs

            const registration = Registration.create(async ({ isDestroyed }) => {
                while (true) {
                    await forTime(1000 * 10 * Math.random() * 0.1 /* <- TODO: Tweak time */);

                    if (isDestroyed()) {
                        return;
                    }

                    console.log('next', order);

                    // TODO: !!!! Use some faker / random
                    observer.next(
                        spaceTrim(`
                        
                            <li>
                                <span class="order">${order++}</span>
                                <span class="time">11:25</span>
                                <span class="log">
                                    - ${Math.random()}
                                </span>
                            </li>
                        
                        `),
                    );
                }
            });

            return () => registration.destroy();
        });
    }
}

// !!! Anotate all
