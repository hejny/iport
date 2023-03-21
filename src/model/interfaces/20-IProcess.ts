import { Observable } from 'rxjs';
import { IInputData, IProcessId, IServerHtml, IServerHtmlWithInput } from './00-simple';

/**
 * Object that represents one running process on the server
 */
export interface IProcess {
    /**
     * Any unique identification of the process
     */
    processId: IProcessId;

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
    menuItem: IServerHtml;

    /**
     * Observable that emits an array of HTML strings representing incoming logs.
     *
     * Note: Each item is NOT ONE new row BUT ALL loges together in array
     */
    logs: Observable<Array<IServerHtml>>;

    /**
     * Observable that emits HTML with input data for the process.
     */
    inputForm: Observable<IServerHtmlWithInput>;

    /**
     * Sends input data to the server.
     * If the receive fails, it throws an Error (rejects the promise).
     *
     * @param input - Object containing input data
     */
    recieveInput(input: IInputData): Promise<void>;
}
