# How do I debug a Node app?

    node --inspect --debug
    node --inspect --debug-brk

Use together with
[NIM](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj).

You can combine above with `nodemon`:

    nodemon --inspect --debug
    nodemon --inspect --debug-brk

Note that when `nodemon` restarts the server, the debug URL changes and it is
necessary to load the new URL. This can be automated with the Chrome extension.

# Sources

- https://nodejs.org/api/debugger.html#debugger_v8_inspector_integration_for_node_js
