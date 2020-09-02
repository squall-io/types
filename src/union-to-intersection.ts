/**
 *
 * `UnionToIntersection<U>`
 *
 *
 * Merge distinct members of the union `U` into a single type.
 */
type UnionToIntersection<U> = (U extends any ? ( k: U ) => void : never) extends (( k: infer I ) => void) ? I : never;
