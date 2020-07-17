# CSS Grid

If all you need is a refresher, check out
[Learn CSS Grid](https://learncssgrid.com/). If you want to thoroughly learn CSS
Grid, check out paid [Grid Critters](https://mastery.games/gridcritters/).
[CSS Grid](https://cssgrid.io/) is a free alternative.

Use `display: grid;` on a div to switch to grid layout. Everyting inside the div
is referred to as grid items. A grid is made up of columns and rows, which both
are referred to as tracks.

You can think of an unspecified grid as

```
grid-template-columns: 1fr;
grid-template-rows: 1fr;
```

By default, there is one column with grid items taking up the the entire width
and rendering with their intrinsic height.

`fr` takes into considerations gaps while `%` does not. If a column is `50%` of
the grid it will be 50% no matter what.

## grid-template-columns

Define columns with `grid-template-columns` by providing one or more arguments
that are either widths like `100px` or fractions of remaining space like `1fr`.
The default value is `none`.

To avoid repetition you can use `repeat` to create tracks.

```
grid-template-columns: repeat(4, 100px);
```

is the same as

```
grid-template-columns: 100px, 100px, 100px, 100px;
```

## grid-template-rows

Define rows with `grid-template-rows` by providing one or more arguments that
are either heights like `100px` or fractions of remaining space like `1fr`. The
default value is `none`.

To avoid repetition you can use `repeat` to create tracks.

```
grid-template-rows: repeat(2, 1fr 2fr);
```

is the same as

```
grid-template-rows: 1fr 2fr 1fr 2fr;
```

## grid-gap

If you provide one value only, it sets both `grid-row-gap` and
`grid-column-gap`. If you provide two values, the first one sets `grid-row-gap`
and the second one `grid-column-gap` (rows then columns).

You can use the following units: `vw`, `vh`, `%`, `px`, `rem`. You cannot use
`fr`.
