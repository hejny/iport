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
            const registration = Registration.create(async ({ isDestroyed }) => {
                while (true) {
                    await forTime(1000 * 10 * Math.random());

                    if (isDestroyed()) {
                        return;
                    }

                    // TODO: !!!! Use some faker
                    observer.next(
                        spaceTrim(`
                        
                            <li>
                                <span class="order">3</span>
                                <span class="time">11:25</span>
                                <span class="log">
                                    - We <span style="font-weight:bold">italic</span> make logs<!-- --> <span style="font-style:italic">italic</span> too!
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
