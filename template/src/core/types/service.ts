export type HttpSignal<T> = (signal: AbortSignal) => Promise<T>;
