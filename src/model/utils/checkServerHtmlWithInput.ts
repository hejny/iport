import spaceTrim from 'spacetrim';
import { string_html } from '../../utils/typeAliases';
import { IServerHtmlWithInput } from '../interfaces/00-simple';

/**
 * Check that string is satisfactory ServerHtmlWithInput
 *
 * @param html any HTML
 * @returns ServerHtmlWithInput or throws error
 */

export function checkServerHtmlWithInput(html: string_html): IServerHtmlWithInput {
    // TODO: We can do some checking here
    return spaceTrim(html) as IServerHtmlWithInput;
}
