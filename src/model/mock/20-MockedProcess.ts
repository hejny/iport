import { faker } from '@faker-js/faker';
import moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { forTime } from 'waitasecond';
import { InputData, ProcessId, ServerHtml } from '../interfaces/00-common';
import { Process } from '../interfaces/20-Process';
import { checkServerHtml } from '../utils/checkServerHtml';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';

export class MockedProcess implements Process {
    // TODO: !!! Implement
    // TODO: !!! Implement unmocked version
    public constructor(public readonly processId: ProcessId) {
        /* not await */ this.startMockedLogs();
    }

    public get processTitle() {
        return `Process ${this.processId.toString().toUpperCase()}`;
    }

    public get menuItem() {
        return checkServerHtml(`
            <a href="#${this.processId}" target="${
            this.processId
        }" style={{ color: '${faker.color.rgb()}', fontWeight: '${Math.random() > 0.8 ? 'bold' : 'normal'}' }}>
                <span className="time">${moment().format('HH:mm')}</span>
                <span className="name">${this.processTitle}</span>
            </a>
        `);
    }

    async recieveInput(input: InputData): Promise<void> {
        // !!! Make active and replay message + color into the logs

        if (input.message.trim() === '') {
            // TODO: !!! Test the error handling in frontend
            throw new Error(`You need to specify a message`);
        }

        this.newLog(
            checkServerHtml(`
                    
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().format('HH:mm')}</span>
                    <span class="log">
                        - <span style="color: ${input.color}">${input.message}</span>
                    </span>
                </li>
            
            `),
        );
    }

    public logs = new BehaviorSubject<Array<ServerHtml>>([]);

    private logOrder = 0;
    private newLog(log: ServerHtml) {
        // TODO: !!! Maybe logs in reverse
        // TODO: !!! Maybe recycle old array object and just push into it
        this.logs.next([...this.logs.value, log]);
    }

    public async startMockedLogs() {
        // Note: Replay initial logs
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(73, 'minutes').format('HH:mm')}</span>
                    <span class="log">- ${this.processTitle} logs</span>
                </li>
            `),
        );
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(70, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - 🌹 Roses are <span style="color: red">red</span>
                    </span>
                </li>
            `),
        );
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(40, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - 🎻 Violets are <span style="color: blue">blue</span>
                    </span>
                </li>
            `),
        );
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(32, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - Logs can be <span style="font-weight: bold">bold</span>
                            
                    </span>
                </li>
            `),
        );
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(32, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - And <span style="font-style: italic">italic</span> too!
                    </span>
                </li>
            `),
        );
        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(20, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - PS: You can also <a href="https://pavolhejny.com">link</a> with
                        <span style="outline: 2px dotted #0f0">rich</span> html.
                    </span>
                </li>
            `),
        );

        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(7, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - --------------------------------------------------
                    </span>
                </li>
            `),
        );

        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(2, 'minutes').format('HH:mm')}</span>
                    <span class="log">
                        - <i>Following are generated texts to simulate logs:</i>
                    </span>
                </li>
            `),
        );

        this.newLog(
            checkServerHtml(`
                <li>
                    <span class="order">${this.logOrder++}</span>
                    <span class="time">${moment().subtract(1, 'minute').format('HH:mm')}</span>
                    <span class="log">
                        - 
                    </span>
                </li>
            `),
        );

        while (true) {
            await forTime(1000 * (7 * Math.random()) /* <- TODO: Tweak time */);

            // console.log('next', this.logOrder);
            // TODO: !!!! Use some faker / random
            this.newLog(
                checkServerHtml(`
                        
                    <li>
                        <span class="order">${this.logOrder++}</span>
                        <span class="time">${moment().format('HH:mm')}</span>
                        <span class="log">
                            - ${faker.hacker.phrase()}
                        </span>
                    </li>
                
                `),
            );
        }
    }

    input = new BehaviorSubject(
        checkServerHtmlWithInput(`
            <form>
                <label>
                    Send something to server:
                    <input type="text" name="message"/>
                </label>

                <label>
                    Choose a style:
                    <select id="color" name="color">
                        <option value="inherit">Default</option>
                        <option value="red">Red</option>
                        <option value="green">Green</option>
                        <option value="blue">Blue</option>
                        <option value="yellow">Yellow</option>
                        <option value="orange">Orange</option>
                        <option value="purple">Purple</option>
                    </select>
                </label>

                <input type="submit" value="send"/>
                
            </form>
        `),
    );
}
