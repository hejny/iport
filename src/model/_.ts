// TODO: !!! Break into components

import { faker } from '@faker-js/faker';
import { Registration } from 'destroyable';
import moment from 'moment';
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
            // console.log('Observable');

            let order = 0;

            // Note: Replay initial logs

            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:11</span>
                        <span class="log">- Hello here is the sample LOG</span>
                    </li>
                    `),
            );
            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:15</span>
                        <span class="log">
                            - Roses are <span style="color: red">red</span>
                        </span>
                    </li>
                    `),
            );
            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:20</span>
                        <span class="log">
                            - Violets are <span style="color: blue">blue</span>
                        </span>
                    </li>
                    `),
            );
            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:25</span>
                        <span class="log">
                            - Logs can be <span style="font-weight: bold">bold</span>
                              and span style="fontStyle: italic">italic</span> too!
                        </span>
                    </li>
                    `),
            );
            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:35</span>
                        <span class="log">
                            - PS: You can also <a href="https://pavolhejny.com">link</a> with
                            <span style="outline: 2px dotted #0f0">rich</span> html.
                        </span>
                    </li>
                    `),
            );

            observer.next(
                spaceTrim(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">11:44</span>
                        <span class="log">
                            - --------------------------------------------------
                        </span>
                    </li>
                    `),
            );

            const registration = Registration.create(async ({ isDestroyed }) => {
                while (true) {
                    await forTime(1000 * (7 * Math.random()) * 0.01 /* <- TODO: Tweak time */);

                    if (order > 50) {
                        return;
                    }

                    if (isDestroyed()) {
                        return;
                    }

                    // console.log('next', order);

                    // TODO: !!!! Use some faker / random
                    observer.next(
                        spaceTrim(`
                        
                            <li>
                                <span class="order">${order++}</span>
                                <span class="time">${moment().format('HH:mm')}</span>
                                <span class="log">
                                    - ${faker.hacker.phrase()}
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
