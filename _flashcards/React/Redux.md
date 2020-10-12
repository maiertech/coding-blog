# Redux

Store methods:

getState: retrieve current state. dispatch: dispatch actions to change state.
subscribe: register callback that Store will call after action has been
dispatched and processed.

## Reducer composition

### Arrays

When you have array in state you can create a reducer to process single elements
and call it from the array reducer. The array reducer calls a reducer to update
elements inside the array.

### Objects

Create reducers for different props. Then assemble new state by calling prop
reducers for each prop.

This is pretty much what combineReducers does.
