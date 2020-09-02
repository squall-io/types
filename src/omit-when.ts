/**
 *
 * `OmitWhen<U, V ?= any, K ?= KeyOf<U, V>>`
 *
 * For every member of the union `U`, omit its keys `K` for those keys which map to `V`.
 */
type OmitWhen<U, V = any, K extends KeyOf<U, V> = KeyOf<U, V>> = U extends any ? Omit<U, K & KeyOf<U, V> & PropertyKey> : never;
