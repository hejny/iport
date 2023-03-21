import { string_html } from '../../utils/typeAliases';

/**
 * HTML incomming from server.
 *
 * It can contain:
 * - Plain text
 * - Basic structure like <p>, <a>, <br/> or <hr/>
 * - Formatting like <b>, <i>, <strong>,...
 * - Self-contained css like <span style="color: red">...
 * - It should be space-trimmed
 *
 * But it should NOT contain:
 * - Invalid HTML
 * - Unclosed tags
 * - CSS, which breaks other things like <style> a{color: transparent;} <style>
 *
 * Note: It is just a typescript-branded type to ensure that instead can not be passed some random string
 */
export type ServerHtml = string_html & { __type: 'ServerHtml' };

/**
 * @@@
 */
export type ServerHtmlWithInput = ServerHtml & { __type: 'ServerHtmlWithInput' };

/**
 *
 * Note: There is already build-in type for html form data but @@@
 */
export type InputData = Record<string, string>;

export type ProcessId = string | number;
