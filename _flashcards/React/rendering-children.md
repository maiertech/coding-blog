# How can I render children?

```
<Grid>
  <Row />
  <Row />
  <Row />
</Grid>
```

Inner `<Row />` components are passed to `<Grid>` as `props.children`.

Parent `<Grid>` can render children like this

```
class Grid extends Component {
  render() {
    return <div>{this.props.children}</div>
  }
}
```

or ignore children like this

```
class Grid extends Component {
  render() {
    return <h1>Hello world!</h1>
  }
}
```

# Sources

- https://mxstbr.blog/2017/02/react-children-deepdive/
