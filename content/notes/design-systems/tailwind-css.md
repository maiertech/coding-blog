# Tailwind CSS

The reason why I'm looking into Tailwind CSS is because my team finds it hard to
wrap their heads around [Theme UI](https://theme-ui.com/home).

Furthermore, we still have a lot of legacy websites for which a visual update is
due but for which rewriting them with Theme UI is not an option. We need
something that works in both worlds, legacy websites and modern React apps, and
that relies on one single source of truth for styling.

Tailwind CSS is a candiadte and in this note I explore how this could work.

## PostCSS

[`tailwindcss`](https://www.npmjs.com/package/tailwindcss) is a PostCSS plugin.
You can compose and customize the parts from Tailwind you want to use and
compile it into the final CSS file with PostCSS.

Tailwind does not include any JavaScript.

## Utility-first workflow

The idea is to not write any custom CSS but use pre-defined utility classes. You
can use
[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
to access all utility classes.

Using utility classes makes it very easy to create styles, but it comes with the
downside that the resulting code is pulluted with dozens of global class names.

## Gatsby

How do yuo use Tailwind CSS with Gatsby? Configure the PostCSS chain with
[`gatsby-plugin-postcss`](https://www.gatsbyjs.org/packages/gatsby-plugin-postcss/)
and then import the compiled CSS file in your `gatsby-browser.js` as global CSS.
See
[Tailwind and Gatsby](https://hashinteractive.com/blog/tailwind-css-and-gatsby-in-under-5-minutes/)
article.

## Theme UI

If you like the Tailwind's utility-first workflow, do not use Theme UI. The
utility-first workflow is fundamentally incompatible with Theme UI's
component-driven and styling-via-props approach.

But if you like Tailwind's design-system, i.e., space scales, breakpoints etc.
you can use
[`@theme-ui/preset-tailwind`](https://github.com/system-ui/theme-ui/tree/master/packages/preset-tailwind).
This presewt mimicks Tailwind's design system in a theme, which you can use like
any other Theme UI theme. But there is no PostCSS compile chain anywhere.
`tailwindcss` is not even a dependency. See
[How to Use Theme UI Tailwind CSS Preset](https://hashinteractive.com/blog/how-to-use-theme-ui-tailwind-css-preset/)
article.

Tailwind's philosophy is to define a ton of utility classes from which you use
only a few to build your actual site. On the other hand, Theme UI's philosophy
is to choose a theme with some predefined scales and then use them to create
your components. You do not have to write a lot of custom CSS because you try to
stick with what is defined in your theme.

## Building reusable components with Tailwind

This is a summary of the article
[Building Reusable React Components Using Tailwind](https://www.smashingmagazine.com/2020/05/reusable-react-components-tailwind/).

Using Tailwind CSS with React means using Tailwind's utility classes with the
`className` prop:

```
className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
```

This is not pretty, but you could just use standard HTML elements of React and
slab on classes and you DX would be pretty close to using Tailwind in a project
with pure HTML and CSS.

Using the `classnames` package, you could create a nicer component API on top of
the class mess:

```
function Button ({size, bgColor, textColor, children}) {
  return (
    <button className={classnames("bg-${bgColor} text-${textColor} font-bold py-2 px-4 rounded", {
      "text-xs": size === 'sm'
      "text-xl": size === 'lg',
    })}>
      {children}
    </button>
  )
};
```

The approach of using the `className` prop and `classnames` packages allows you
using Tailwind CSS with React but keeps you a close as possible to the original
Tailwind experience without adding an abstraction layer.

You could go one step up from this approach by defining a theme, which defines
constants of Tailwind UI class names that can be applied to components. This is
similar to working with variants in Theme UI or mixins in Sass. The theme file
is just a JavaScript object that could be maintained in its own package and
shared across projects.

You can also use Tailwind's `@apply` directive to abstract classes. This makes
sense for atomic components like buttons, but it can get quickly out of control
if you want to do this for more complex components. More complex components have
HTML structure and abstracting CSS does not help you in any way to abstract the
HTML structure.

What you actually want at this point is reusable components or template
partials. Inside the reusable components you can use Tailwind's classes. Rather
than using `@apply` to abstract classes, you should abstract components that are
styled with utility classes because they also abstract the structure.

Is there a way to reuse component abstractions outside React or Vue?

Not in plain HTML and CSS. Here your only option is copy paste. But if you have
some kind of template engine, then you can use template partials to abstract
components.

## Examples

- [swr.vercel.app](https://github.com/vercel/swr-site) is built with Tailwind.
- It is based on [Nextra](https://github.com/shuding/nextra), which is also
  built with Tailwind.

## Links

Checkout https://egghead.io/instructors/adam-wathan.
