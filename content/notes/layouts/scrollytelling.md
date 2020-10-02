# Scrollytelling layout

I came across [Waves](https://github.com/pomber/gatsby-waves) and its successor
[Code Hike](https://codehike.org/) recently and was wondering how difficult it
would be to create my own scrollytelling layout. This note explores scrolling
layouts.

## Prior art

### Image Wave

https://waves.pomb.us/images

Background image changes based on scroll position. This is layout is inherently
mobile friendly because it's easy to render images on all screen sizes.

### Chart Wave

https://waves.pomb.us/charts

On big screens text scrolls while charts stick and change on right hand side
based on scrolling position. Mobile layout makes the charts stick and change in
the top part of the screen. Charts need to be fully scalable to make this work.
This pattern works with anything that is easily scalable to small screens.

A variation of this pattern is Deck Wave: https://waves.pomb.us/deck. However,
some slides do not scale well down to small screens.

### ArcGIS Storymaps

https://undesa.maps.arcgis.com/apps/MapJournal/index.html?appid=894bed8498eb449a983af8b33a7125f3#detail

This storymap displays scrolling text and stickers next to each other. This
works well on large screens. On small screens they stop using a scrolling
pattern and switch to left and right switpes with overlay of image and text.
This is very confusing counter-intuitive when it comes to navigation.

### Canals

https://canals-amsterdam.nl/

On desktops this websites surpises by enforcing horizontal scrolling. On small
screens it uses no scrolling effect, but a simple sequential stacked layout. The
latter seems the best option for small screens.

### New York Times

https://www.nytimes.com/interactive/2020/09/02/magazine/food-insecurity-hunger-us.html

Article with beautiful scroll effects.

### Code Hike

- https://codehike.org/
- https://github.com/code-hike/codehike
- https://mdxconf2020.pomb.us/
- https://github.com/pomber/the-x-in-mdx

## Responsive Layout

Seems like on small screens the split screen option with the top or bottom half
sticking only works if stickers scale down gracefully. If they don't, it seems a
better option to skip the sticker effect and present content sequentially
stacked.

On medium screens the split screen layout may work. You may have to distinguish
between portrait and landscape to adapt layout.

On large screens you can display scrolling text and stickers next to each other.
You could also experiment with horizontal scrolling.

## Intersection observer API

https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

The Intersection Observer API provides a way to asynchronously observe changes
in the intersection of a target element with an ancestor element or with the
top-level document's viewport, referred to as root element.

Create an intersection observer like this:

```
const observer = new IntersectionObserver(callback, options);
```

`callback` fires whever a target crosses a threshold of intersection with the
root (in both directions) or when a target is added for observation.

The `entries` argument of the callback contains an entry for each target for
which a change in intersection status is reported.

Intersection is calculated based on rectangles only. If root or target shapes
are not rectangles, they substituted with the smallest rectangle that fits the
element.

### Options

#### threshold

Single number between `0` and `1` or array thereof. `0` means that as soon as
`1` Pixel is visible the callback fires. `1` means that every pixel needs to be
visible for callback to fire. `[0, 0.25, 0.5, 0.75, 1]` means that the callback
fires whenever visibility passes another 25%. You can put an array instead of a
number for more fine grained reporting.

### Entries

The most important property to look at is `isIntersecting`.
