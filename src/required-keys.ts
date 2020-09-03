/**
 *
 * `RequiredKeys<U, V ?= any>`
 *
 *
 * For every member of the Union `U`, returns the required keys that map to `V`.
 *
 * ```typescript
 * type Letter = { a: 'a', readonly A?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = RequiredKeys<Letter>;  // "a"
 * ```
 *
 * **Union distribution**
 *
 * ```typescript
 * type Input = { a: 'a', readonly A?: 'A' }  | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = RequiredKeys<Input>;   // "a" | 0
 * ```
 *
 * **Retain required keys mapping to a type**
 *
 * ```typescript
 * type Input = { a: 'a', readonly A: 'A' }  | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = RequiredKeys<Input, 'A'>;  // 1
 * ```
 */
type RequiredKeys<U, V = any> = U extends any ? RequiredKeys.Atomic<U, V> : never;
namespace RequiredKeys {
    export type Atomic<T, V, K extends keyof T = keyof T> = {
        [key in K]-?: Omit<T, key> extends T ? never : T[key] extends V ? key : never
    }[K];
}
