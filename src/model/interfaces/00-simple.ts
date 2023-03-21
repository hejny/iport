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
 * Type representing server HTML with input data.
 *
 * It has simmilar restrictions as ServerHtml but it can contain:
 *
 * - One or multiple <form> WITHOUT specified action or target
 * - <input> with specified name inside a <form>
 * - <textarea> with specified name inside a <form>
 * - <select> with specified name inside a <form>
 */
export type ServerHtmlWithInput = ServerHtml & { __type: 'ServerHtmlWithInput' };

/**
 * Object containing input data from <form> in ServerHtmlWithInput
 *
 * Note: There is already build-in type for html form data but we do not want to be dependent on it
 */
export type InputData = Record<string, string>;

/**
 * Type representing process ID, which can be a string or a number.
 */
export type ProcessId = string | number;
