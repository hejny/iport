#!/usr/bin/env ts-node

import chalk from 'chalk';
import cors from 'cors';
import express from 'express';
import glob from 'glob-promise';
import { join, relative } from 'path';
import serveIndex from 'serve-index';
import serveStatic from 'serve-static';
import { spaceTrim } from 'spacetrim';

const PORT = 5001;

// !!! Implement mocked server

const assetsBasePath = join(__dirname, '../../other/messages-api-samples/');
const importAssetsPath = join(__dirname, '../../other/import/');

const app = express();

app.use(cors());
app.use(serveStatic(assetsBasePath, { index: ['index.html'] }));
app.use('/import', serveStatic(importAssetsPath, { index: false }));
app.use('/import', serveIndex(importAssetsPath, { icons: true }));
app.use('/import/list', async (request, response) => {
    response.send({
        templates: (await glob(join(importAssetsPath, '/*/*')))
            .filter((filename) => !/TODO(\.md)?$/.test(filename))
            .filter((filename) => !/outdated/.test(filename))
            .map((filename) => relative(importAssetsPath, filename).split('\\').join('/'))
            .map((basename) => ({
                title: basename.split('/').join(' ').split('_').join(' ').split('-').join(' ').split('.')[0],
                url: `http://localhost:${PORT}/import/${basename}`,
            })),
    });
});
// app.use(serveIndex(assetsBasePath, { icons: true }));
app.listen(PORT);

console.info(
    chalk.bgGrey(
        spaceTrim(`
            🔥 Messages API samples server listening
            🔥 Main Page:     http://localhost:${PORT}/
            🔥 Import Assets: http://localhost:${PORT}/import
        `),
    ),
);
