// TODO: !!! Break into components

import { faker } from '@faker-js/faker';
import { Registration } from 'destroyable';
import moment from 'moment';
import { Observable } from 'rxjs';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { string_html } from '../../utils/typeAliases';

//-----------------------Classes

/**
 * HTML incomming from server.
 *
 * It can contain:
 * - Plain text
 * - Basic structure like <p>, <a>, <br/> or <hr/>
 * - Formatting like <b>, <i>, <strong>,...
 * - Self-contained css like <span style="color: red">...
 * - It should be space-trimmed
 *
 * But it should NOT contain:
 * - Invalid HTML
 * - Unclosed tags
 * - CSS, which breaks other things like <style> a{color: transparent;} <style>
 *
 * Note: It is just a typescript-branded type to ensure that instead can not be passed some random string
 */
type ServerHtml = string_html & { __type: 'ServerHtml' };

/**
 * Check that string is satisfactory ServerHtml
 *
 * @param html any HTML
 * @returns ServerHtml or throws error
 */
export function checkServerHtml(html: string_html): ServerHtml {
    // TODO: We can do some checking here

    return spaceTrim(html) as ServerHtml;
}

// !!! Better name
export interface ServerConnector {
    // TODO: !!! newProcessOptions;

    /**
     * Available running processes
     * Every update(next) of the observable will fully update the process list.
     */
    processList: Observable<Array<Process>>;

    getProcessById(processId: string | number): Process;
}

export interface Process {
    /**
     * Any unique identification of the process
     */
    processId: string | number;

    /**
     * Title of the process
     *
     * Tip: You can add an status char into the processTitle like ⬜🟥🟩
     */
    processTitle: string;

    /**
     * How the process will be shown in the left menu
     *
     * Tip: You can add here non <a> item as a separator
     *
     * It should be in this format:
     * > <a href="#processId" target="processId" style="...">
     * >      <span className="time">11:11</span>
     * >      <span className="name">processTitle</span>
     * > </a>
     *
     */
    processMenuItem: ServerHtml;

    /**
     * Incomming logs
     * Each item will be shown in a new row
     */
    logs: Observable<ServerHtml>;
}

//-----------------------Implementations

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

export class MockedProcess implements Process {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version

    public constructor(public readonly processId: string | number) {}

    public get processTitle() {
        return `Process ${this.processId.toString().toUpperCase()}`;
    }

    public get processMenuItem() {
        return checkServerHtml(`
            <a href="#${this.processId}" target="${
            this.processId
        }" style={{ color: '${faker.color.rgb()}', fontWeight: '${Math.random() > 0.8 ? 'bold' : 'normal'}' }}>
                <span className="time">${moment().format('HH:mm')}</span>
                <span className="name">${this.processTitle}</span>
            </a>
        `);
    }

    public get logs() {
        return new Observable<ServerHtml>((observer) => {
            // console.log('Observable');

            let order = 0;

            // Note: Replay initial logs

            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(73, 'minutes').format('HH:mm')}</span>
                        <span class="log">- ${this.processTitle} logs</span>
                    </li>
                    `),
            );
            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(70, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - 🌹 Roses are <span style="color: red">red</span>
                        </span>
                    </li>
                    `),
            );
            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(40, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - 🎻 Violets are <span style="color: blue">blue</span>
                        </span>
                    </li>
                    `),
            );
            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(32, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - Logs can be <span style="font-weight: bold">bold</span>
                              
                        </span>
                    </li>
                    `),
            );
            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(32, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - And <span style="font-style: italic">italic</span> too!
                        </span>
                    </li>
                    `),
            );
            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(20, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - PS: You can also <a href="https://pavolhejny.com">link</a> with
                            <span style="outline: 2px dotted #0f0">rich</span> html.
                        </span>
                    </li>
                    `),
            );

            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(7, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - --------------------------------------------------
                        </span>
                    </li>
                    `),
            );

            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(2, 'minutes').format('HH:mm')}</span>
                        <span class="log">
                            - <i>Following are generated texts to simulate logs:</i>
                        </span>
                    </li>
                    `),
            );

            observer.next(
                checkServerHtml(`
                    <li>
                        <span class="order">${order++}</span>
                        <span class="time">${moment().subtract(1, 'minute').format('HH:mm')}</span>
                        <span class="log">
                            - 
                        </span>
                    </li>
                    `),
            );

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

                    // console.log('next', order);

                    // TODO: !!!! Use some faker / random
                    observer.next(
                        checkServerHtml(`
                        
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
