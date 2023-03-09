export function useProcessId(): null | string | number {
    if (typeof window === 'undefined') {
        return null;
    }

    const hash = window.location.hash;

    if (hash === '' || hash === '#') {
        return null;
    }

    return hash.substring(1);
}
