# Tricks and pitfalls in CodeSandbox

## Renaming a sandbox

When you rename a sandbox from within the sandbox, this also changes the `name`
field in `package.json`. According to Codesandbox support, this is expected
behavior. They recommend using folders instead of renaming to organize
sandboxes.

Renaming a sandbox from the dashboard currently does not alter `package.json`.
Codesandbox support considers this to be a bug that they plan to fix. Therefore,
if you need to organize your sandboxes, use folders

## Open in CodeSandbox badge

Combine [githubbox.com](https://githubbox.com) with
[shields.io](https://shields.io/):

https://github.com/dferber90/githubbox/blob/master/README.md
