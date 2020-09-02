type ValueOf<U> = U extends any ? U[keyof U] : never;
