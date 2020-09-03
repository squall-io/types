/**
 *
 * `ValueOf<U>`
 *
 * For every member of the union `U`, return the value types to which its keys map.
 *
 * ```typescript
 * type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * type Result = Union[keyof Union];    // never
 * type ThisResult = ValueOf<Union>;    // "a" | "A" | undefined
 * ```
 */
type ValueOf<U> = U extends any ? U[keyof U] : never;
