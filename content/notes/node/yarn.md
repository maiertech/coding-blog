# Yarn

## Resolutions

This [issue](https://github.com/system-ui/theme-ui/issues/1345) is an example
where conflicting versions of a package result in a problem. When it is not
possible to resolve the version conflict by pinning dependencies, you can force
a dependency to be resovled to a specific version using the `resolutions` prop
in your project root `package.json`.
