# Installing Node

## Homebrew

The standard way of installing `node` is with [Homebrew](https://brew.sh/):

    brew install node

This gives you the latest version of Node, easy to update.

## Node Version Manager (NVM)

If you need more flexibility to switch between diferent versions of Node,
[NVM](https://github.com/nvm-sh/nvm) is the standard option. It can be installed
with Homebrew, but requires modifying `~/.zshrc` or `~/.bashrc` to hook it up
inside your terminal:

```
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

When setup correctly, `nvm` can automatically switch to the Node version
configured in `.nvmrc` when changing into a directory. But every team member has
to go through a manual setup to make it work.

[`n`](https://github.com/tj/n) is a more simple alternative that can also be
installed with Homebrew. But it lacks the magic of `nvm` and requires manual
switching between Node versions.

## `node` package

In most cases, using the latest version of Node, installed with Homebrew, works
just fine and installing NVM is not needed. But in projects where you need to
use a specific version of Node, you can also add Node as a dependency with
package [`node`](https://www.npmjs.com/package/node).

When installing package `node` with `npm` it adds a path entry to a specific
version of Node that takes precedence over the system Node. But you cannot use
this option together with NVM, since NVM intercepts any invocations of Node in
your shell and launches its version of Node.

If you install package `node` with `npm` it just works and you can test running
a specific Node version with

    npx node

If you use `yarn`, to install package `node`, the Node binary does not get
downloaded. You need to run

    yarn --check-files --ignore-scripts

to fix this. To automate this workaround, add script

    "postinstall": "yarn --check-files --ignore-scripts"

to your `package.json` (as seen in
[this comment](https://github.com/yarnpkg/yarn/issues/3421#issuecomment-443972019)).
