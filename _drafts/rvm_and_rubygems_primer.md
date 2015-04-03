---
layout: theme:post
title: RVM and RubyGems Primer
summary: This post gives a brief introduction to RVM (Ruby Version Manager) and RubyGems, a package manager for Ruby.
author: Thilo Maier
twitter_username: mdotasia
categories: 'development tools'
tags: rvm, gems, gemsets, ruby
---

[Sass](http://sass-lang.com/) and [Compass](http://compass-style.org/) are two indispensable tools for front-end web development. Both come as [Ruby](https://www.ruby-lang.org/en/) gems and therefore web developers need to be able to easily install them on their machine. Besides, web developers often face the challenge of having to maintain different versions of Ruby and gemsets for different projects on the same machine. The [Ruby Version Manager (RVM)](https://rvm.io/) is a great tool to address both challenges.

<!--more-->

## Virtualizing Rubies

The first virtualization that RVM provides is abstracting Rubies. You can install different Ruby versions in parallel and switch back and forth between them.

Execute command

{% highlight bash %}

    rvm list known

{% endhighlight %}

in order to check which Rubies you can install with RVM. This lists a whole bunch of different Ruby implementations. [MRI Rubies](https://en.wikipedia.org/wiki/Ruby_MRI) are the reference implementation and RVM makes them default. Here is an example output of the MRI Rubies portion of `rvm list known` (at the time of writing this post):

{% highlight bash %}

    # MRI Rubies
    [ruby-]1.8.6[-p420]
    [ruby-]1.8.7[-p374]
    [ruby-]1.9.1[-p431]
    [ruby-]1.9.2[-p320]
    [ruby-]1.9.3[-p545]
    [ruby-]2.0.0-p353
    [ruby-]2.0.0[-p451]
    [ruby-]2.1[.1]
    [ruby-]2.1-head
    ruby-head

{% endhighlight %}

In order to install a specific Ruby, let's say `2.0.0-p451`, execute

{% highlight bash %}

    rvm install 2.0.0

{% endhighlight %}

The version number needs to be unique. Above output of the `rvm list known` command gives you a hint. Just type the portion which is not in square brackets. `2.0.0` refers to `ruby-2.0.0-p451`. Execute

{% highlight bash %}

    ruby -v

{% endhighlight %}

to double check that the current Ruby is indeed

{% highlight bash %}

    ruby 2.0.0p451 (2014-02-24 revision 45167) [x86_64-darwin12.5.0]

{% endhighlight %}

If you install a new Ruby version, RVM always makes it the *current* version. You can check which Rubies you have with

{% highlight bash %}

    rvm list

{% endhighlight %}

which gives you an output like this:

{% highlight bash %}

    => ruby-2.0.0-p451 [ x86_64 ]
     * ruby-2.1.0 [ x86_64 ]
       ruby-2.1.1 [ x86_64 ]

    # => - current
    # =* - current && default
    #  * - default

{% endhighlight %}

You can see the current and *default* Rubies. The default Ruby is the one set as current when you start a new terminal session.

Here is an overview of RVM commands you should know:

| Command | Description |
|:--------|:------------|
| `rvm list known` | list all Rubies that can be installed |
| `rvm install <ruby>` | install `<ruby>` |
| `rvm list` | list installed Rubies |
| `rvm use <ruby>` | use `<ruby>` |
| `rvm use <ruby> --default` | use `<ruby>` and make it default |
| `rvm system` | use system Ruby |
| `rvm remove <ruby>` | remove `<ruby>` |

## Virtualizing Gemsets

Using multiple Rubies in parallel adds a lot of flexibility. But what happens if you have several projects requiring the same Ruby version?

This is when RVM's *gemsets* come to the rescue. A gemset is an abstraction that allows you to manage and maintain separate sets of gems. You can activate a gemset within your current Ruby, manage your gems with `gem` and then switch to another gemset when you work on  another project. Both gemsets are kept separate and do not interfere with each other.

RVM knows two predefined gemsets: `default` and `global`. Whenever you do not specify a gemset in an RVM command, you work on `default`. Any gemset inherits all gems contained in `global`. The pre-defined gemset `global` contains [`bundler`](http://bundler.io/), i.e. you can immediately run `bundle install`.

Ift is normally not necessary to manually update gems that are included in the `global` gemset. If you keep moving your projects to the latest stable Ruby and at the same time keep RVM updated, the `global` gemset in newer Ruby versions will contain updated versions.

Here is an overview of RVM gemset commands you should know:

| Command | Description |
|:--------|:------------|
| `rvm gemset create <gemset>` | create `<gemset>` (to actually use it, execute `gemset use <gemset>`) |
| `rvm gemset list` | list gemsets for current Ruby and mark current gemset |
| `rvm gemset list_all` | list gemsets for all Rubies and mark current gemset for each Ruby |
| `rvm gemset use <gemset>` | use `<gemset>` |
| `rvm gemset use <ruby>@<gemset> --default` | make `<ruby>` and `<gemset>` combo the default |
| `rvm gemset empty <gemset>` | remove all gems from `<gemset>` |
| `rvm gemset delete <gemset>` | delete `<gemset>` |

## Why gemsets?

Maintaining different gemsets for different tasks and projects makes a lot of sense, no doubt. But you might be tempted to just cram gems for different projects into the default gemset, especially when trying to get a new project off the ground under pressure.

The little overhead of managing gemsets and switching back and forth between them will be a win rather sooner than later. Assume that the day has come that you are supposed to upgrade your project to a newer Ruby. With RVM and gemsets this is easy: install the new Ruby in parallel to the old one, copy the project gemset to the new Ruby and start testing the new Ruby with your project without any delay.

**Therefore, in each project, use a *project-specific* gemset.**

## Installing and Updating RVM

Last but not least a note on installing and upgrading RVM. To install RVM, just execute [the installation command from the RVM homepage](https://www.gnu.org/software/bash/). The beauty of RVM is that it is a combo of [Bash](https://www.gnu.org/software/bash/) and Ruby and it does not require a system Ruby to be installed.

You can check your current RVM version with

{% highlight bash %}

    rvm -v

{% endhighlight %}

To be in the loop about RVM updates, follow [@rvm_io](https://twitter.com/rvm_io) on Twitter. When there is a new version, simply execute

{% highlight bash %}

    rvm get stable

{% endhighlight %}

to update RVM to the latest stable version.

## Package Management with RubyGems

When you install Ruby via RVM, RVM also installs the [RubyGems](https://rubygems.org/) package manager. Its main feature is the `gem` command. With RVM installed, ` gem` operates on the current gemset.

Here is an overview of the `gem` commands you should know:

| Command | Description |
|:--------|:------------|
| `gem list` | list installed gems with version |
| `gem outdated` | list outdated gems |
| `gem install <gem>` | install `<gem>` |
| `gem uninstall <gem>` | uninstall `<gem>` |
| `gem dependency <gem> [-v <version>] [--remote]` | display dependencies of all gems containing `<gem>` in their name, optionally of the specified version and remotely |
| `gem list <gem> --remote --all` | list all remotely available versions of gems containing `<gem>` in their name
| `gem cleanup` | clean up old versions of installed gems |
| `gem update --system` | update to latest RubyGems |
