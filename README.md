# @squall.io/types
Utility types to extends TypeScript capabilities.

# Why?

TypeScript team's philosophy is not to add more utility type: it divides the community.

> We have decided to not add any additional utility types unless they are needed for declaration emit.
> Every time we add a new utility type, there are ~four different forms to choose from, people split
> roughly equally on which is "best", and then 75% of people get mad that we added the "wrong" one
> and blocked them from adding the "right" one to their project's global scope - given that
> situation, we think it's better for people to just add whichever utility types they need
> to their own project.
>
> [Ryan Cavanaugh](https://github.com/RyanCavanaugh), on [TypeScript repository](https://github.com/microsoft/TypeScript/issues/39305#issuecomment-651246070).

Yet, there are many types that we repeat across our projects.
Some of them are simple to write out, others are just cryptic - so to say.

Having those types in a separate package and made them widely available would have at least two effects:

- We no more need to crack our head to craft some types
- We don't have to maintain those type ourselves, per project

> Note: We do care to keep your properties modifiers, like _optional_ and _readonly_. 

# What's In?

<!-- WhatIsIn:start -->
### `KeyOf<U, V ?= any>`

For every member of the union `U`, return its keys that map to `V`.

**Union distribution**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

type Result = keyof Union;       // never
type ThisResult = KeyOf<Union>;  // 0 | "a" | "A" | 1
```

**Filter keys mapping to a type**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = KeyOf<Union, 'A'>; // "A" | 1
```

### `OmitWhen<U, V ?= any, K ?= KeyOf<U, V>>`

For every member of the union `U`, remove its keys `K` when those keys map to `V`.

**Union distribution**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

type Result = Omit<Union, 'a'>;              // {}
type ThisResult = OmitWhen<Union, any, 'a'>; // { readonly A?: 'A' }
```

**Remove keys mapping to a type**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = OmitWhen<Union, 'a'>;  // { readonly A?: 'A' } | { 1?: 'A' }
```

### `OptionalKeys<U, V ?= any>`

For every member of the union `U`, return the optional keys that map to `V`.

```typescript
type Letter = { a: 'a', readonly A?: 'A' };

// TypeScript | Not Applicable
type ThisResult = OptionalKeys<Letter>;  // "A"
```

**Union distribution**

```typescript
type Input = { a: 'a', readonly A?: 'A' }  | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = OptionalKeys<Input>;   // "A" | 1
```

**Retain optional keys mapping to a type**

```typescript
type Input = { a: 'a', readonly A: 'A' }  | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = OptionalKeys<Input, 'A'>;  // 1
```

### `PickWhen<U, V ?= any, K ?= KeyOf<U, V>>`

For every member of the union `U`, retain its keys `K` when those keys which map to `V`.

**Union distribution**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

type Result = Pick<Union, 'A'>;              // Error: Type 'string' does not satisfy the constraint 'never'.
type ThisResult = PickWhen<Union, any, 'A'>; // { readonly A?: 'A' } | {}
```

**Retain keys mapping to a type**

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = PickWhen<Union, 'A'>;  // { readonly A?: 'A' } | { 1?: 'A' }
```

### `RequiredKeys<U, V ?= any>`


For every member of the Union `U`, returns the required keys that map to `V`.

```typescript
type Letter = { a: 'a', readonly A?: 'A' };

// TypeScript | Not Applicable
type ThisResult = RequiredKeys<Letter>;  // "a"
```

**Union distribution**

```typescript
type Input = { a: 'a', readonly A?: 'A' }  | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = RequiredKeys<Input>;   // "a" | 0
```

**Retain required keys mapping to a type**

```typescript
type Input = { a: 'a', readonly A: 'A' }  | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = RequiredKeys<Input, 'A'>;  // 1
```

### `UnionToIntersection<U>`


Merge distinct members of the union `U` into a single type.

```typescript
type Input = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

// TypeScript | Not Applicable
type ThisResult = UnionToIntersection<Input>;    // { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' }
```

### `ValueOf<U>`

For every member of the union `U`, return the value types to which its keys map.

```typescript
type Union = { a: 'a', readonly A?: 'A' } | { 0: 'a', 1?: 'A' };

type Result = Union[keyof Union];    // never
type ThisResult = ValueOf<Union>;    // "a" | "A" | undefined
```
<!-- WhatIsIn:end -->

# Contributors

- [Salathiel Genese](https://github.com/SalathielGenese)

# Licence

[MIT License](https://github.com/squall-io/types/blob/master/LICENSE)

[Copyright (c) 2020 Squall.IO](https://github.com/squall-io/types/blob/master/LICENSE)
