/**
 *
 * `OptionalKeys<U, V ?= any>`
 *
 * For every member of the union `U`, return the optional keys that map to `V`.
 *
 * ```typescript
 * type Letter = { a: 'a', readonly A?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = OptionalKeys<Letter>;  // "A"
 * ```
 *
 * **Union distribution**
 *
 * ```typescript
 * type Input = { a: 'a', readonly A?: 'A' }  | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = OptionalKeys<Input>;   // "A" | 1
 * ```
 *
 * **Retain optional keys mapping to a type**
 *
 * ```typescript
 * type Input = { a: 'a', readonly A: 'A' }  | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = OptionalKeys<Input, 'A'>;  // 1
 * ```
 */
type OptionalKeys<U, V = any> = U extends any ? OptionalKeys.Atomic<U, V> : never;
namespace OptionalKeys {
    export type Atomic<T, V, K extends keyof T = keyof T> = {
        [key in K]-?: Omit<T, key> extends T ? T[key] extends (V | undefined) ? key : never : never
    }[K];
}
