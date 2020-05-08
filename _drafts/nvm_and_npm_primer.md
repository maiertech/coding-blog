---
layout: theme:post
title: NVM and NPM Primer
summary:
  This article gives a brief introduction to NVM (Node Version Manager) and NPM
  (Node Package Manager).
author: Thilo Maier
twitter_username: mdotasia
category: devtools
tags: nvm, node, javascript
---

[Grunt](http://gruntjs.com/) and [Bower](http://bower.io/) are indispensable
tools for front-end web development. They all come as Node packaged modules,
i.e. they run on [Node.js](http://nodejs.org/). Therefore, web developers need
to be able to easily install them on their machine. On Mac and Linux, the
[Node Version Manager (NVM)](https://github.com/creationix/nvm) helps install
and manage different versions of Node in parallel.

<!--more-->

NVM is the [RVM](https://rvm.io/) equivalent for Node. If you are familiar with
RVM, there is almost nothing new to learn about NVM other than slightly
different command syntax. If you are not familiar with RVM, I suggest you take a
look at [the RVM primer]().

## Installing and Updating NVM

To install NVM, execute the installation script posted on the
[NVM homepage](https://github.com/creationix/nvm). At the time of drafting this
article, the installation script was

{% highlight bash %}

    curl https://raw.github.com/creationix/nvm/v0.4.0/install.sh | sh

{% endhighlight %}

This command installs NVM version v0.4.0. Similar to RVM, NVM is a simple bash
script and does not require a system Node.js to work.

You can check your current NVM version with

{% highlight bash %}

    nvm --version

{% endhighlight %}

At the time of writing this article, NVM does not have an upgrade option.
Therefore, you need to check on the NVM homepage for newer versions. Shortly
after the first draft of this article was finished, NVM was upgraded to version
0.5.0 and the installation script changed to

{% highlight bash %}

    curl https://raw.github.com/creationix/nvm/v0.5.0/install.sh | sh

{% endhighlight %}

and all I had to do to upgrade to the newer version was executing the newer
version of the installation script.

## NVM Commands

Here is an overview of the NVM commands you should know:

| Command                       | Description                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `nvm ls-remote`               | list all Node versions that can be installed (check latest stable version on [nodejs.org](http://nodejs.org/)) |
| `nvm install <version>`       | install Node `<version>`                                                                                       |
| `nvm ls`                      | list installed Node versions                                                                                   |
| `nvm use <version>`           | use Node `<version>`                                                                                           |
| `nvm use`                     | use Node version from `.nvmrc` file                                                                            |
| `nvm alias default <version>` | make Node `<version>` default                                                                                  |
| `nvm uninstall <version>`     | uninstall Node.js `<version>`                                                                                  |

Use `which node` to figure out which Node version is active.

## Package Management with `npm`

When you install Node via NVM, you also get the latest version of `npm`, the
Node package manager. `npm` is to Node what `gem` is to Ruby. With `npm`, you
can manage any [Node packaged modules](https://www.npmjs.org/).

NVM does not know an abstraction equivalent to RVM's gemsets. But `npm`
distinguishes between _local_ and _global_ installation:

- A _global installation_ makes a package and its documentation available on the
  command-line by installing it into Node's `lib/node-modules` directory. With
  NVM installed and Node `<version>` in use, this corresponds to
  `$HOME/.nvm/<version>/lib/node_modules`.

- A _local installation_ installs a package without documentation into the the
  `node-modules` directory of the _current directory_. Local installations can
  be used for project-specific installations into a project directory.

Unlike in bower, npm installs dependencies with each package, i.e. they may be
duplicated. That's why npm is not really suitable to manage dependencies,
because you need to cherrypick from the duplicates. Bower installes every
package exactly once.

Here is an overview of `npm` commands you should know:

| Command                        | Description                                                                                           |
| :----------------------------- | :---------------------------------------------------------------------------------------------------- |
| `npm list [-g] --depth=n`      | list locally [globally] installed packages with dependencies up to depth `n` (normally use `depth=0`) |
| `npm outdated [-g] --depth=n`  | list locally [globally] outdated packages with dependencies up to depth `n` (normally use `depth=0`)  |
| `npm install <package> [-g]`   | install `<package>` locally [globally]                                                                |
| `npm update <package> [-g]`    | update `<package>` locally [globally]                                                                 |
| `npm update`                   | update local packages according to `package.json`                                                     |
| `npm uninstall <package> [-g]` | uninstall `<package>` locally [globally]                                                              |
| `npm search <string>`          | search for available packages containing `<string>`                                                   |
| `npm prune`                    | prune local packages not listed in local `package.json` (use within project directory)                |

## What to do on Windows

NVM is not availalbe on Windows. You need to install Node natively on Windows
and you can have only one Node version installed. The most convenient way to
install Node is with this command

    cinst nodejs.install

via [Chocolatey package manager](). Once installed, you can execute all of the
`npm` commands listed in the previous section.
