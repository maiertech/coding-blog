# Spread and Rest

## Spread Operator

Given an iterable object and a function with signature

```JavaScript
function(x, y, z)
```

you can use the spread operator `...` to pass the iterable object as argument to
that function:

```JavaScript
function(...iterableObj)
```

The spread operator spreads the iterable object to match the function's
signature.

Likewise, you can use the spread operator to create arrays from iterable
objects:

```JavaScript
[...iterableObj, 4, 5, 6]
```

Note that you cannot apply the spread operator on a JavaScript object, because
it is not iterable.

But there is one exception. JSX defines its own spread operator that can be
applied to objects. You can pass on this set of props

```JavaScript
const props = {
  href: 'https://coding.maier.asia',
  target: '_blank',
}
```

to a component `<a>` using the JSX spread operator:

```JavaScript
return <a {...props}>Link</a>;
```

This is equivalent to passing in single props.

## Rest Operator

You can use the rest operator in a function signature:

```JavaScript
function(a, b, ...args)
```

Any parameters beyond `a` and `b` are collected in array `args`, which can be
accessed within the function.

The rest operator can be applied only to the last argument in a function
signature and indicates a variable number of arguments. Not to be confused with
spread operator applied to argument when a function is called.

```JavaScript
const logArgs = (...args) => console.log(...args);
```

Note that the first `...` is the rest operator and the second `...` is the
spread operator.

The rest operator is also handy for destructuring. Assume you have a number of
properties in `this.props` (inside a React component). Instead of passing all
props to a child component you can use the rest operator to pass on only
required props. Assuming that `size` is not required in the child component, we
can destructure as follows

```JavaScript
const {size, ...rest} = this.props
```

with `rest` being an object. Then you can use the JSX spread operator to pass on
`rest`:

```JavaScript
return <a {...rest}>{this.props.children}</a>
```

---

Say we have an object `comment` which needs to be cloned and an ID added:

```JavaScript
_handleCommentSubmit(comment) {
  let {comments} = this.state
  let newComment = {...comment, id: Date.now()}
  let newComments = [...comments, newComment]
  // set state
}
```

Spread `comment` properties into new object and then spread `comments` into new
array.

Originally, the spread operator works with function calls:

```JavaScript
let arrayOfValues = [33, 2, 9]
let maxValueFromArray = Math.max(...arrayOfValues)
```

We can also use the spread operator with constructors:

```JavaScript
new Array(1, ...values, 5)
```

is equivalent to the short notation

```JavaScript
[1, ...values, 5]
```

Likewise for objects (not yet official ES6).

```JavaScript
let warriors = {Steph: 95, Klay: 82, Draymond: 79}
let newWarriors = {
  ...warriors,
  Kevin: 97
}
```

In this case spreading helps cloning! Available in Babel stage 3.
