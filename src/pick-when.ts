type PickWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, Exclude<keyof U, K & KeyOf<U, V>>> : never;
