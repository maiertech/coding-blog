# Git workflows with Codesandbox

Vercel's concept of
[immutable deployments](https://vercel.com/docs/v2/platform/deployments)
requires a mental shift of how I think about deployments. I used to think about
deployments as an expensive resource to be used sparingly. Immutable deployments
turn deployments into a commodity. Vercel creates a new deployment every single
time and even keeps the old one around forever.

Codesandbox is different from a locally installed editor such as
[VS Code](https://code.visualstudio.com/). I can have as many sandboxes as I
want. And just like immutable deployments, the best way to use sandboxes is by
being wasteful. I can fork and discard sandboxes as I please.

One feature I thought Codesandbox is missing is a better Git integration (like
the one VS Code has). But the
[Codesandbox documentation points out](https://codesandbox.io/docs/git#committing-and-opening-prs)
that a sandbox (forked from a sandbox created from a GitHub repository), can be
seen as a branch.
