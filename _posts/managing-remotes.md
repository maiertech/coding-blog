## Commands

The following operations help you manage remotes of a Git repository:

| Command | Comment |
|:--------|:--------|
| `git remote -v` | Display remotes |
| `git remote set-url <remote-name> <remote-url>` | Set `remote-url` for remtoe `remote-name` |
| `git remote rename <old_name> <new_name>` | Rename remote |
| `git remote add <remote-name> <remote-url>` | Add remote `remote-name` with URL `remote-url` |
| `git remote rm <remote-name>` | Delete remote `remote-name` |

## Changing the URL of a remote

Let's look at a concrete example. Let's assume you want to check out a fork of this blog's repository via [GitHub Desktop](https://desktop.github.com/) and change the remote `origin`'s default URL from https to SSH. By executing

    git remote -v

you can verify that the URL of remote `origin` is indeed a https URL:

    origin  https://github.com/<username>/coding.maier.asia.git (fetch)
    origin  https://github.com/<username>/coding.maier.asia.git (push)

Execute

    git remote set-url origin git@github.com:<username>/coding.maier.asia.git

And verify with

    git remote -v

that URLs have been changed to

    origin  git@github.com:<username>/eslint-config-mdotasia.git (fetch)
    origin  git@github.com:<username>/eslint-config-mdotasia.git (push)

You can verify with

    git remote show origin

that changing setting the URL preserves any configured tracking branches.

## Working with forks

When you clone a forked repository with GitHub Desktop, the following remotes are created automatically (output of `git remote -v`):

    <original_owner>  https://github.com/<original_owner>/<repository>.git (fetch)
    <original_owner>  https://github.com/<original_owner>/<repository>.git (push)
    origin  https://github.com/<fork_owner>/<repository>.git (fetch)
    origin  https://github.com/<fork_owner>/<repository>.git (push)

GitHub Desktop labels the remote for the original repository with the original owner's Github username. The convention used to be to label the remote for the original repository with `upstream` (see [GitHub documentation](https://help.github.com/articles/configuring-a-remote-for-a-fork/)).

If you want to follow this convention, you can execute

      git rename <original_owner> upstream

to rename the remote for the original repository to `upstream`.

In case you cloned on the command-line, you need to add `upstream` manually using

    git add remote upstream https://github.com/<fork_owner>/repository.git
