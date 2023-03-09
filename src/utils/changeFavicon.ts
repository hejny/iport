import { string_url_image } from './typeAliases';

export function changeFavicon(url: string_url_image) {
    // TODO: Enhance
    let linkElement: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");

    // console.log({ linkElement });

    if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.rel = 'icon';
        document.head.appendChild(linkElement);
    }
    linkElement.href = url;
}

/**
 * Note: This is not working in most of the browsers
 */
