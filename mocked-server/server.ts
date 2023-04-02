#!/usr/bin/env ts-node

import chalk from 'chalk';
import { Socket, Server as SocketIoServer } from 'socket.io';
import { spaceTrim } from 'spacetrim';
import { Response_newProcess } from '../interfaces/_';
import { IProcessId } from '../src/model/interfaces/common';

const PORT = 5001;

const server = new SocketIoServer(PORT, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

server.on('connection', (socketConnection: Socket) => {
    console.log(chalk.green(`Client connected: ${socketConnection.id}`));

    const MOCKED_SERVER_HTML_MARK = `<span>This is a content from server for client ${socketConnection.id}:</span>`;

    // Send a message to the client after they connect
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
            console.log(chalk.green(`Starting new process with input:`), input);

            socketConnection.emit('newProcess', { processId } satisfies Response_newProcess);
        },
    );

    socketConnection.on('disconnect', () => {
        console.log(chalk.magenta(`Client disconnected: ${socketConnection.id}`));
    });
});

console.log(chalk.bgGreen(`Socket.io server listening on port ${PORT}`));
