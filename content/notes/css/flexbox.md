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

`flex-basis` is an ideal hypthetical size before any growing or shrinking.

`flex-basis` deals with size in the flex-direction. If `flex-basis` is set for a
flex item with flex-direction `row` or `row-reverse`, `width` gets ignored.
`flex-basis` respects `min-width` as lower limit. E.g. if `flex-basis` is 100px
and `min-width` is 300px then de facto `flex-basis` is 300px. Same applies to
`max-width`. E.g. if `flex-basis` is 400px and `max-width` is 100px then de
facto flex basis is 100px.

If `flex-direction` is `column` or `column-reverse` then `flex-basis` overrides
`height`. Analogously, `flex-basis` respects `min-height` and `max-height`.

default value: `flex-basis: auto` means rely on width or height dpendening on
flex-direction.

`order`: the higher the order the farther away along the main axis. The lower
the number the closer along main axis. `order` can also be negative, default
order is 0. `order` is like `z-index`. It's not an absolute position but a
weight. The sequence is: first all flex items without order in theri original
order, then ascending by weight and if weight is the same then in original
order.

The `:nth-of-type()` selector always applies to the sequence in which flex-items
appear in the source code. Applying `order` does not change this.

`flex-wrap` default is `nowrap`. Set `flex-wrap` to `wrap` to create new lines.
Lines are parallel to the main axis.

When elements wrap parallel to the main axis, `align-items` applies to each
line. When `flex-wrap` is set to `wrap-reverse`, `align-items` reverses too,
even if nothing wraps. Everything we hav learnt before applies to every wrapped
line!

About shrinking: wrap first, then shrink.

`justify-content` matters in the same way as for non wrapping elements. If there
are non-growing flex items on a line without any growing items, then it matters.
