type OmitWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, K & KeyOf<U, V> & PropertyKey> : never;
