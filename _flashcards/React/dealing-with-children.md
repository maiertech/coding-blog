# How can I deal with children?

Components should not make assumptions what `props.children` is. It can be
anything: array, function, object.

Let `React.Children` deal with children:

- `React.Children.map`: Invoke function on every immediate child and returns an
  array. Can handle `props.children` other than array. Classic use case: clone
  children and add properties.
- `React.Children.forEach`: Invokes function for each child, but does not return
  array. Can handle `props.children` other than array. Classic use case:
  accessing children.
- `React.Children.count`: Count children no matter what type `props.children`
  is.
- `React.Children.toArray`: Convert `props.children` to array if none of above
  functions can be used.
- `React.Children.only`: Return only child in `props.children`, throw otherwise.

`React.cloneElement` can be used to clone a component with props and shallow
merge additional props.

# Sources

- https://mxstbr.blog/2017/02/react-children-deepdive/#function-as-a-child
