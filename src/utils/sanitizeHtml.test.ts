import { describe, expect, it } from '@jest/globals';
import { sanitizeHtml } from './sanitizeHtml';

describe('how sanitizing of html works', () => {
    it('keep clean html', () => {
        expect(sanitizeHtml(``)).toEqual('');
        expect(sanitizeHtml(`Hello world`)).toEqual('Hello world');
        expect(sanitizeHtml(`<b>Hello world</b>`)).toEqual('<b>Hello world</b>');
    });

    it('will sanitize html from H-edu', () => {
        expect(
            sanitizeHtml(
                `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB">`,
            ),
        ).toEqual(
            '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.3/dist/katex.min.css" integrity="sha384-KiWOvVjnN8qwAZbuQyWDIbfCLFhLXNETzBQjA/92pIowpC0d2O3nppDGQVgwd2nB" crossorigin="anonymous">',
        );
    });
});
