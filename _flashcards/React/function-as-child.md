# How can I use a function as child?

This pattern

```
<Fetch url="api.example.com">
  {(result) => <p>{result}</p>}
</Fetch>
```

```
class Fetch extends Component {
  // Initialize state.
  constructor() {
    super()
    this.state = { result: false }
  }

  // Fetch data when component mounts.
  componentWillMount() {
    fetch(this.props.url)
      .then(response => response.text())
      .then(result => {
        this.setState({
          result: result
        })
      })
  }

  render() {
    // Render child function.
    return this.state.result
      ? this.props.children(this.state.result)
      : <p>Loading...</p>
  }
}
```

# Sources

- https://mxstbr.blog/2017/02/react-children-deepdive/#function-as-a-child
