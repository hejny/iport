import { Observable } from 'rxjs';
import { InputData, ProcessId, ServerHtml, ServerHtmlWithInput } from './00-common';

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
     * Incomming logs
     * Each item will be shown in a new row
     */
    logs: Observable<ServerHtml>;

    /**
     * Incomming logs
     * Each item will be shown in a new row
     */
    input: Observable<ServerHtmlWithInput>;

    /**
     * !!!
     *
     * If the recive fails it throws an Error (rejects the promise)
     */
    recieveInput(input: InputData): Promise<void>;
}
