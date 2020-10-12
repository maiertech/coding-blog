# Styled Components

How to structure a project with styled components:
http://stackoverflow.com/questions/42987939/styled-components-organization/42996969#42996969

A tagged template literal is a function with this signature:

```
function dummy(stringChunks, ...interpolations)
```

The function is not called with above arguments but with an interpolated string
from which the two arguments, the `stringChunks` array and the `interpolations`
array are derived:

```
dummy`...`
```

Rest parameter `...interpolations` creates array `interpolations` containing all
interpolated values – before they are converted to strings.

When defining a styled component with `styled` you get a real React `Component`.
