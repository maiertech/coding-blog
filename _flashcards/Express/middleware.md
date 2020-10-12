# Middleware

Serving static files is done with middleware:

    app.use('/static', express.static(__dirname + '/public'))

This serves static files from directory `public` from URL `/static`.
