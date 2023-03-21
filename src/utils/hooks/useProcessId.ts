import { ProcessId } from '@/model/interfaces/00-simple';

export function useProcessId(): null | ProcessId {
    if (typeof window === 'undefined') {
        return null;
    }

    const hash = window.location.hash;

    if (hash === '' || hash === '#') {
        return null;
    }

    return hash.substring(1);
}
