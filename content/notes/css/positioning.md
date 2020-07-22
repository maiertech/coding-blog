# Positioning

https://twitter.com/b0rk/status/1285257205571366917

## Fixed

Removes an element from the normal flow. Element does not inherit width or
height and therefore adapts to its content (width and height are auto).

If `top`, `bottom`, `left` or `right` are not provided, positioning makes not
sense. Not clear what defaults are.

Element inherits `color` from the element that would be its parent element, but
does not inherit `background-color`, which is set to initial value
`transparent`. Therefore, you need to set `background-color` for the positioned
element.
