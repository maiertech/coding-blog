# GitHub Actions

You can look up what is
[installed on a virtual environment](https://help.github.com/en/actions/reference/software-installed-on-github-hosted-runners).

## `GITHUB_TOKEN`

GitHub automatically creates a `GITHUB_TOKEN` with
[these permissions](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token#permissions-for-the-github_token)
that can be used to interact with a repository. However, anything authenticated
with `GITHUB_TOKEN` does not trigger workflows. But you can create a personal
authentication token to ensure that actions can trigger workflows.

## Common actions

### actions/checkout

Action [Checkout](https://github.com/marketplace/actions/checkout) is used like
this

    - uses: actions/checkout@v2

By default, this action checks out the latest commit only.To checkout the entire
commit history, configure

    - uses: actions/checkout@v2
      with:
        fetch-depth: 0

By default, this action persists auto generated `GITHUB_TOKEN` to enable Git
commands in subsequent steps. This will override any persoanl authentication
token you might want to use in subsequent actions to ensure they trigger
workflows. You can configure

    - uses: actions/checkout@v2
      with:
        persist-credentials: false

### actions/setup-node

Action
[Setup Node.js environment](https://github.com/marketplace/actions/setup-node-js-environment)
is often used like this

    - uses: actions/setup-node@v1
      with:
        node-version: '12.x'

or with a matrix. If you just need Node on a `ubuntu-latest` image, you do not
need to use this action. You also do not need this actions when using the
[`node` package](https://jxwty.sse.codesandbox.io/notes/devtools/installing-node).

## Trigger events

https://help.github.com/en/actions/reference/events-that-trigger-workflows

### `pull_request`

Triggers by default for activity types `opened`, `synchronized` and `reopened`.
There should be no need to customize activity types in most situations.

## Authoring actions

Use the [GitHub Actions Toolkit](https://github.com/actions/toolkit) to author
GitHub actions.

### `@actions/github`

Authenticated [Octokit](https://octokit.github.io/rest.js/v17) client.
