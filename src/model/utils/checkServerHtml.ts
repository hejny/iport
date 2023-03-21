import spaceTrim from 'spacetrim';
import { string_html } from '../../utils/typeAliases';
import { IServerHtml } from '../interfaces/00-simple';

/**
 * Check that string is satisfactory ServerHtml
 *
 * @param html any HTML
 * @returns ServerHtml or throws error
 */

export function checkServerHtml(html: string_html): IServerHtml {
    // TODO: We can do some checking here
    return spaceTrim(html) as IServerHtml;
}
