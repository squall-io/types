/**
 *
 * `KeyOf<U, V ?= any>`
 *
 * For every member of the union `U`, return its keys that map to `V`.
 *
 * **Union distribution**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * type Result = keyof Union;       // never
 * type ThisResult = KeyOf<Union>;  // 0 | "a" | "A" | 1
 * ```
 *
 * **Filter keys mapping to a type**
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = KeyOf<Union, 'A'>; // "A" | 1
 * ```
 */
type KeyOf<U, V = any> = RequiredKeys<U, V> | OptionalKeys<U, V>;
