/**
 *
 * `ValueOf<U>`
 *
 *
 * For every member of the union `U`, return the value types to which its keys map.
 */
type ValueOf<U> = U extends any ? U[keyof U] : never;
