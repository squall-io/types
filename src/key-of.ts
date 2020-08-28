type KeyOf<T, V = any> =
    Exclude<T extends any ? {
        [K in keyof T]: K extends any
            ? Omit<T, K> extends T
                ? T[K] extends (V | undefined) ? K : never
                : T[K] extends V ? K : never
            : never;
    }[keyof T] : never, undefined>;