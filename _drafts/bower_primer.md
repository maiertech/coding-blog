---
layout: theme:post
title: Bower Primer
summary:
  'This post provides a brief introduction to Bower, a package manager for web
  development.'
author: Thilo Maier
twitter_username: mdotasia
categories: 'development tools'
tags: bower
---

In previous posts, I discussed [RubyGems](https://rubygems.org/) and
[npm](https://www.npmjs.com/) package managers for Ruby and Node dependency
management. Beyond Ruby and Node dependencies, a web application usually has
additional dependencies that do not fall in either category, e.g. JavaScript
libraries such as [jQuery](https://jquery.com/) or Sass libraries, such as
[Bourbon](http://bourbon.io/), or a combination JavaScript and Sass, such as
[Bootstrap](http://getbootstrap.com/).

[Bower](http://bower.io/) is a package manager for web applications that manages
dependencies such as JavaScript libraries, Sass libraries and assets.

| Command        | Description                                                   |
| :------------- | :------------------------------------------------------------ |
| `bower list`   | List installed packages and display latest available versions |
| `bower update` | Update all packages to the versions specified in `bower.json` |

- bower_components
- .bowerrc
