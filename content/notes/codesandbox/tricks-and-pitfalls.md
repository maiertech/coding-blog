# Tricks and pitfalls in Codesandbox

## Renaming a sandbox

When you rename a sandbox from within the sandbox, it also changes the `name`
field in `package.json`. This looks like a bug (pending with Codesandbox
support). Renaming a sandbox from the dashboard does not alter `package.json`.
