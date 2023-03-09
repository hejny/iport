import { Observable } from 'rxjs';
import { ServerHtml } from './00-ServerHtml';

/**
 * Object that represents one running process on the server
 */
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
