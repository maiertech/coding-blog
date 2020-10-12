# How can I automatically restart the server?

[nodemon](https://nodemon.io/) is a smart wrapper around a Node application that
watches all files in the directory from which it was started. Whenever a file
changes, nodemon restarts the application. Simply use `nodemon` instead of
`node`.

When used in combination with [Express](http://expressjs.com/) you still need to
hit the reload button.
