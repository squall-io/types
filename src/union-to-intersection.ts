/**
 *
 * `UnionToIntersection<U>`
 *
 *
 * Merge distinct members of the union `U` into a single type.
 *
 * ```typescript
 * type Input = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };
 *
 * // TypeScript | Not Applicable
 * type ThisResult = UnionToIntersection<Input>;    // { a: 'a', readonly A?: 'A' } & { 0: 'a', 1?: 'A' }
 * ```
 */
type UnionToIntersection<U> = (U extends any ? ( k: U ) => void : never) extends (( k: infer I ) => void) ? I : never;
