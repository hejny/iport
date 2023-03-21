import { Observable } from 'rxjs';
import { InputData, ProcessId, ServerHtml, ServerHtmlWithInput } from './00-simple';

/**
 * Object that represents one running process on the server
 */
export interface Process {
    /**
     * Any unique identification of the process
     */
    processId: ProcessId;

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
    menuItem: ServerHtml;

    /**
     * Observable that emits an array of HTML strings representing incoming logs.
     *
     * Note: Each item is NOT ONE new row BUT ALL loges together in array
     */
    logs: Observable<Array<ServerHtml>>;

    /**
     * Observable that emits HTML with input data for the process.
     */
    input: Observable<ServerHtmlWithInput>;

    /**
     * Sends input data to the server.
     * If the receive fails, it throws an Error (rejects the promise).
     *
     * @param input - Object containing input data
     */
    recieveInput(input: InputData): Promise<void>;
}
