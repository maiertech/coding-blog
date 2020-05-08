# Node debugging

https://github.com/node-inspector/node-inspector is the way to go to debug your
Node app with the Chrome debugger. Simply start `node-inspector`.

## Debugging Mocha tests

## Debugging Gulp tasks

In theory, testing a Gulp task is as easy as executing this command:

    node-debug $(which gulp) task

If you use [nodenv](https://github.com/OiNutter/nodenv), there is a catch.

`which gulp` return the shim

    /Users/thilo/.nodenv/shims/gulp

which is a bash script and this cannot be debugged. You need to slightly adapt
the invocation:

    node-debug $(nodenv which gulp) task
