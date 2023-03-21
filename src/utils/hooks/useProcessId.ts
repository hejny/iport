import { IProcessId } from '@/model/interfaces/common';

export function useProcessId(): null | IProcessId {
    if (typeof window === 'undefined') {
        return null;
    }

    const hash = window.location.hash;

    if (hash === '' || hash === '#') {
        return null;
    }

    return hash.substring(1);
}
