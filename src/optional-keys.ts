type OptionalKeys<T> =
    T extends any ? { [K in keyof T]-?: K extends any ? Omit<T, K> extends T ? K : never : never }[keyof T] : never;