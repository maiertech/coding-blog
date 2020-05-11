# MDX Deck

I'm trying to use [mdx-deck](https://github.com/jxnblk/mdx-deck) for my
presentations. It seemed so much easier to use when compared with
[Spectacle](https://formidable.com/open-source/spectacle/).

But, I'm having a number of issues with mdx-deck v4.

## What I want to achieve

I would like to host my presentations at `deck.maier.dev/<presentation>`.

## Option 1: `mdx-deck` and monorepo

My first try was to use package `mdx-deck` in combination with a monorepo. Each
presentation has its own `package.json` with dependencies. A custom build script
would build each presentation, copy it into a folder for consolidation and then
publish it.

However I could not figure out a way to configure `mdx-deck` to make a build
that can be served from a subdirectory.

## Option 2: Gatsby site using `gatsby-theme-mdx-deck`

This works OK enough except that the themes in v4 are buggy. Multiple lines of
content do not distribute nicely and overflow slides. There is a white left and
top border on slides.

This should be fixable, hoping for someone to fix it or need to look myself into
it.
