/**
 *
 * `KeyOf<U, V ?= any>`
 *
 *
 * For every member of the union `U`, return its keys that map to `V`.
 */
type KeyOf<U, V = any> = RequiredKeys<U, V> | OptionalKeys<U, V>;
