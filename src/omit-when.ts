/**
 *
 * `OmitWhen<U, V ?= any, K ?= KeyOf<U, V>>`
 *
 * For every member of the union `U`, remove its keys `K` when those keys map to `V`.
 *
 * **Union distribution**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * type Result = Omit<Union, 'a'>;              // {}
 * type ThisResult = OmitWhen<Union, any, 'a'>; // { readonly A?: 'A' }
 * ```
 *
 * **Remove keys mapping to a type**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = OmitWhen<Union, 'a'>;  // { readonly A?: 'A' } | { 1?: 'A' }
 * ```
 */
type OmitWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, K & KeyOf<U, V> & PropertyKey> : never;
