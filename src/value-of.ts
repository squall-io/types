type ValueOf<T, K extends KeyOf<T> = KeyOf<T>> =
    T extends any ? {[k in K & keyof T]: T[k]}[K & keyof T] : never