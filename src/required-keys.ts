type RequiredKeys<T> =
    T extends any ? Exclude<keyof T, OptionalKeys<T>> : never;