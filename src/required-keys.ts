/**
 *
 * `RequiredKeys<U, V ?= any>`
 *
 *
 * For every member of the Union `U`, returns the required keys that map to `V`.
 */
type RequiredKeys<U, V = any> = U extends any ? RequiredKeys.Atomic<U, V> : never;
namespace RequiredKeys {
    export type Atomic<T, V, K extends keyof T = keyof T> = {
        [key in K]-?: Omit<T, key> extends T ? never : T[key] extends V ? key : never
    }[K];
}
