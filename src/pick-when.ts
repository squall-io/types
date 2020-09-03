/**
 *
 * `PickWhen<U, V ?= any, K ?= KeyOf<U, V>>`
 *
 * For every member of the union `U`, retain its keys `K` when those keys which map to `V`.
 *
 * **Union distribution**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * type Result = Pick<Union, 'A'>;              // Error: Type 'string' does not satisfy the constraint 'never'.
 * type ThisResult = PickWhen<Union, any, 'A'>; // { readonly A?: 'A' } | {}
 * ```
 *
 * **Retain keys mapping to a type**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = PickWhen<Union, 'A'>;  // { readonly A?: 'A' } | { 1?: 'A' }
 * ```
 */
type PickWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, Exclude<keyof U, K & KeyOf<U, V>>> : never;
