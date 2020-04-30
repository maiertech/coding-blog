# Tricks and pitfalls in Codesandbox

## Renaming a sandbox

When you rename a sandbox from within the sandbox, this also changes the `name`
field in `package.json`. According to Codesandbox support, this is expected
behavior. They recommend using folders instead of renaming to organize
sandboxes.

Renaming a sandbox from the dashboard currently does not alter `package.json`.
Codesandbox support considers this to be a bug that they plan to fix. Therefore,
if you need to organize your sandboxes, use folders
