/**
 *
 * `OptionalKeys<U, V ?= any>`
 *
 *
 * For every member of the union `U`, return the optional keys that map to `V`.
 */
type OptionalKeys<U, V = any> = U extends any ? OptionalKeys.Atomic<U, V> : never;
namespace OptionalKeys {
    export type Atomic<T, V, K extends keyof T = keyof T> = {
        [key in K]-?: Omit<T, key> extends T ? T[key] extends (V | undefined) ? key : never : never
    }[K];
}
