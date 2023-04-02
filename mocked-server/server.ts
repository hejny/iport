#!/usr/bin/env ts-node

import { faker } from '@faker-js/faker';
import chalk from 'chalk';
import moment from 'moment';
import { Socket, Server as SocketIoServer } from 'socket.io';
import { spaceTrim } from 'spacetrim';
import {
    Socket_Event_newLogs,
    Socket_Event_processes,
    Socket_Request_getProcessById,
    Socket_Response_getProcessById,
    Socket_Response_newProcess,
    Socket_Subscribe_LogsAndInputFrom,
} from '../interfaces/_';
import { IServerProcess } from '../src/model/interfaces/IServerProcess';
import { IProcessId, IServerHtml } from '../src/model/interfaces/common';
import { checkServerHtml } from '../src/model/utils/checkServerHtml';

const PORT = 5001;

const runningProcesses: Array<
    Pick<IServerProcess, 'processId' | 'processTitle' | 'menuItem'> & {
        logOrder: number;
        logs: Array<IServerHtml>;
    }
> = [
    {
        processId: 'a',
        processTitle: 'Process A',
        menuItem: checkServerHtml(
            `
                <a href="#a" target="a">
                    <span class="time">${moment().format('HH:mm')}</span><span class="name">Process A</span>
                </a>
        `,
        ),
        logOrder: 0,
        logs: [],
    },
];

const server = new SocketIoServer(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

server.on('connection', (socketConnection: Socket) => {
    console.log(chalk.green(`Client connected: ${socketConnection.id}`));

    const MOCKED_SERVER_HTML_MARK = `<span>This is a content from server for client ${socketConnection.id}:</span>`;

    // Send a initial messages to the client after they connect
    socketConnection.emit('processes', runningProcesses satisfies Socket_Event_processes);
    socketConnection.emit(
        'newProcessOptionsForm',
        spaceTrim(`

            ${MOCKED_SERVER_HTML_MARK}
    
            <form>
                <label>
                    Start process ID:
                    <input type="text" name="processId"/>
                </label><br/>
                <label>
                    Start process named:
                    <input type="text" name="processTitle"/>
                </label>
                <input type="submit" value="Start"/>
            </form>

            <form>
                <input type="hidden" name="processId" value="foo"/>
                <input type="hidden" name="processTitle" value="Foo"/>
                <input type="submit" value="Start foo"/>
            </form>

            <form>
                <input type="hidden" name="processId" value="bar"/>
                <input type="hidden" name="processTitle" value="Bar"/>
                <input type="submit" value="Start bar"/>
            </form>
            
        `),
    );

    socketConnection.on(
        'startNewProcess',
        (
            input: {
                processId: IProcessId;
                processTitle: string;
            } /* <- Note: this type is 100% determined from shape of newProcessOptionsForm input names */,
        ) => {
            const { processId, processTitle } = input;
            console.log(chalk.green(`Starting new process with ID "${processId}" with input:`), input);

            runningProcesses.push({
                processId,
                processTitle,
                menuItem: checkServerHtml(
                    `
                        <a
                            href="#${processId}"
                            target="${processId}"
                            style="color: ${faker.color.rgb()}; fontWeight: ${Math.random() > 0.8 ? 'bold' : 'normal'}"
                        >
                            <span class="time">${moment().format('HH:mm')}</span>
                            <span class="name">${processTitle}</span>
                        </a>
                    `,
                ),
                logOrder: 0,
                logs: [
                    checkServerHtml(`
                        
                        <li>
                            <span class="order">0</span>
                            <span class="time">${moment().format('HH:mm')}</span>
                            <span class="log">
                                - <span style="color: #ccc">First message of ${processTitle}</span>
                            </span>
                        </li>
                    
                    `),
                ],
            });

            // !!! Error handling and emmiting from here

            // This respond to startNewProcess
            socketConnection.emit('newProcess', { processId } satisfies Socket_Response_newProcess);

            // This broadcast new process to all connected clients
            server.emit(
                'processes',
                runningProcesses /* <- TODO: Sending bit more then needed */ satisfies Socket_Event_processes,
            );
        },
    );

    socketConnection.on('getProcessById', ({ processId }: Socket_Request_getProcessById) => {
        const runningProcess = runningProcesses.find((runningProcess) => runningProcess.processId === processId);
        if (!runningProcess) {
            console.error(chalk.red(`Can not get process by ID "${processId}"`));
            // !!! Error handling and emmiting from here IF NOT found
            return;
        }
        socketConnection.emit('getProcessById', runningProcess satisfies Socket_Response_getProcessById);
    });

    socketConnection.on('subscribeToLogsAndInputFrom', ({ processId }: Socket_Subscribe_LogsAndInputFrom) => {
        const runningProcess = runningProcesses.find((runningProcess) => runningProcess.processId === processId);
        if (!runningProcess) {
            console.error(chalk.red(`Can not get process by ID "${processId}"`));
            // !!! Error handling and emmiting from here IF NOT found
            return;
        }

        socketConnection.emit('newLog', { logs: runningProcess.logs } satisfies Socket_Event_newLogs);
    });

    socketConnection.on('disconnect', () => {
        console.log(chalk.magenta(`Client disconnected: ${socketConnection.id}`));
    });
});

console.log(chalk.bgGreen(`Socket.io server listening on port ${PORT}`));
