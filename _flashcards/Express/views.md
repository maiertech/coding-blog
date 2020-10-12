# How do I configure a template engine?

    app.set('view engine', 'pug')
    app.set('views', __dirname + '/views')

Paths are relative to the Node process. Above code assumes we are in `src`. When
you configure the route you need to call

    res.render('post', propsObj)

to render template `post`.
