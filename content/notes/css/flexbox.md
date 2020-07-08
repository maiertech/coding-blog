# Flexbox

- [Flexbox Zombies](https://mastery.games/flexboxzombies/)

Use `display: flex;` to activate flexbox layout.

Use `flex-direction` to determine main axis and direction: `row` (default),
`row-reverse`, `column` and `column-reverse`. Can be omitted for default
direction.

Use `justify-content` to place items along the main axis. This value is moot if
you have at least one item with `flex-grow`, which will take up all additional
available space. `flex-start` (default), `center`, `flex-end`, `space-between`,
`space-around` (equal space around each item).

Use `algin-items` to align along cross axis. `stretch` (default), `flex-start`,
`center` and `flex-end`. Aligment follows reading direction, i.e. left to right,
top to bottom.

Use `align-self` to define exceptions along the cross-axis for individual items.

`flex-grow` defines how elements grow along main axis. Defines the ratio with
which additional space is allocated to each growing element. Default is `0`. If
anything uses `flex-grow`, `justify-content` is moot.

`flex-shrink` defines how elements shrink along the main axis when there is not
enough space for all elements. It only kicks in when there is not enough space.
The default is `flex-shrink: 1`. Let's say the width of 4 flex items combined is
100px. 2 shrink at rate `1` and 2 shrink at rate `2`. If you shrink the width to
88px, then anything with shrink rate 1 shrinks by 2px and anything with shrink
rate 2 shrinks by 4px. `justify-content` is moot the moment something starts
shrinking.
