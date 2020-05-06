# GitHub Actions

You can look up what is
[installed on a virtual environment](https://help.github.com/en/actions/reference/software-installed-on-github-hosted-runners).

## Common actions

### actions/checkout

Action [Checkout](https://github.com/marketplace/actions/checkout) is used like
this

    - uses: actions/checkout@v2

By default, it checks out the latest commit only, not the entire commit history.

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
