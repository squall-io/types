/**
 *
 * `Constructor<T ?= any, P ?= any[]>`
 *
 * Describe a constructor signature, by its instance type `T` and its arguments `P`.
 *
 * ```typescript
 * type Coordinate = { longitude: number, latitude: number };
 * type CoordinateConstructor = Constructor<Coordinate, [ longitude: number, latitude: number ]>
 *
 * // Good
 * const EarthCoordinate: CoordinateConstructor = class {
 *     public constructor(
 *         public longitude: number;
 *         public latitude: number;
 *     ) {}
 * }
 *
 * // Error: Missing instance properties "longitude" and "latitude"
 * const MarsCoordinate: CoordinateConstructor = class {
 *     public constructor(
 *         longitude: number;
 *         latitude: number;
 *     ) {}
 * }
 *
 * // Error: Type "string" is not assignable to type "number"
 * const NeptuneCoordinate: CoordinateConstructor = class {
 *     public longitude!: number;
 *     public latitude!: number;
 *
 *     public constructor( weight: string ) {}
 * }
 * ```
 *
 */
type Constructor<T = any, P extends any[] = any[]> = {
    new ( ...parameters: P ): T;
}
