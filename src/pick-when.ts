/**
 *
 * `PickWhen<U, V ?= any, K ?= KeyOf<U, V>>`
 *
 * For every member of the union `U`, pick its keys `K` for those keys which map to `V`.
 */
type PickWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, Exclude<keyof U, K & KeyOf<U, V>>> : never;
