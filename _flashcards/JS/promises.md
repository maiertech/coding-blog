# Promises and async functions

```JavaScript
const fetchJson = (path, options) => (
  fetch(`${DOMAIN}${path}`, options)
    .then(res => res.json())
)

const fetchComments = () => fetchJson('/api/comments')

const getUniqueCommentAuthors = () => (
  fetchComments()
    .then(comments => comments.map(({author} => author ))
    .then(authors => _.uniq(authors))
    .catch(ex => console.error('Something bad happened', ex))
  )
)

getUniqueCommentAuthors()
  .then(uniqueAuthors => { this.setState({uniqueAuthors})})
```

Convert callbacks into promises:

```JavaScript
const sleep = (delay = 0) => (
  new Promise(resolve => {
    setTimeout(resolve, delay)
  })
)

sleep(3000)
  .then(() => getUniqueCommentAuthors())
  .then(uniqueAuthors => { this.setState({uniqueAuthors})})
```

A Node.js example:

```JavaScript
const readFile = (filePath) => (
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) { reject(err) }
      resolve(data)
    })
  })
)

readFile('path/to/file')
  .then(data => console.log('Here is the data', data))
  .catch(ex => console.error('Arg!', ex))
```

Promise.all:

```JavaScript
Promise.all([
  fetchComments(),
  fetchPosts(),
  fetchUsers()
])
  .then(responses => {
    let [comments, posts, users] = responses
    this.setState({
      comments,
      posts,
      users
    })
  })
```

Everything async. Under the hood it uses a combo of generators and promises.

```JavaScript
async _handleCommentSubmit(commit) {
  try {
    fetch(this.props.url, {
      method: 'POST',
      body: JSON.stringify(comment)
    })
    newComments = await res.json()
  } catch(ex) {
    console.error(this.props.url, ex)
    newComments = comments
  }
  this.setState({comments: newComments})
}
```

Result of async function gets wrapped in promise.

```JavaScript
const funWithAsync = async () => {
  let uniqueAuthors = await getUniqueCommentAuthors()

  await sleep(1500)

  let packageInfo = JSON.parse(await readFile('./package.json'))

  await sleep(3000)

  let [comments, posts, users] = await Promise.all([
    fetchComments(),
    fetchPosts(),
    fetchUsers()
  ])

  return 42
}
```
