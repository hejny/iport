import { string_html } from './typeAliases';

/**
 * Sanitize HTML
 *
 * @param html dirty html from user (or parter apps like H-edu)
 * @returns clean html to be used in HTMLArt
 *
 * @collboard-modules-sdk
 */
export function sanitizeHtml(html: string_html): string_html {
    const containerElement = document.createElement('div');
    containerElement.innerHTML = html;

    for (const linkElement of Array.from(containerElement.querySelectorAll('link,script'))) {
        if (linkElement.getAttribute('integrity')) {
            linkElement.setAttribute('crossorigin', 'anonymous');
        }
    }

    return containerElement.innerHTML;
}

/**
 * TODO: Where should be this file - it is definetelly util which can be under src/40-utils/jsx-html BUT is also used only here in @collboard/internal/html-import
 */
