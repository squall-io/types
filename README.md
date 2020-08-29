# @squall.io/types
Utility types to extends TypeScript capabilities.

# Why?

TypeScript philosophy is not to add more utility type: it divides the community.

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

# What's In?

<!-- WhatIsIn:start --><!-- WhatIsIn:end -->

# Contributors

- [Salathiel Genese](https://github.com/SalathielGenese)

# Licence

[MIT License](https://github.com/squall-io/types/blob/master/LICENSE)

[Copyright (c) 2020 Squall.IO](https://github.com/squall-io/types/blob/master/LICENSE)
