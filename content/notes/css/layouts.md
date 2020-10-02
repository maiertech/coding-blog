# Layouts

- [Grab-and-go layouts for React](https://react-layouts.com/)
- [Every Layout](https://every-layout.dev/)
- [Article Layout with CSS Grid](https://mastery.games/post/article-grid-layout/)
- [Inclusive Components](https://inclusive-components.design/)

## Useful CSS for layouts

When using `min-height: 100vh;`, on iOS Safari you do not get the expected
result since the viewport is bigger than the visible area due to Safari showing
its address bar.

The trick is to use:

```
min-height: 100vh;
min-height: -webkit-fill-available;
```
