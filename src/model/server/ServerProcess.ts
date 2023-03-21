import { BehaviorSubject } from 'rxjs';
import { IServerProcess } from '../interfaces/IServerProcess';
import { IInputData, IProcessId, IServerHtml } from '../interfaces/common';
import { checkServerHtmlWithInput } from '../utils/checkServerHtmlWithInput';

export class ServerProcess implements IServerProcess {
    public constructor(public readonly processId: IProcessId) {}

    public get processTitle() {}

    public get menuItem() {}

    public async recieveInput(input: IInputData): Promise<void> {}

    public logs = new BehaviorSubject<Array<IServerHtml>>([]);

    public inputForm = new BehaviorSubject(
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

    private newLog(log: IServerHtml) {
        // TODO: Maybe logs in reverse - most recent logs are more important and maybe it is optimal to have them as first items in the array
        // TODO: Maybe recycle old array object and just push into it
        this.logs.next([...this.logs.value, log]);
    }
}
