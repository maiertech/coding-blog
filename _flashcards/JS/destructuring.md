# Destructuring

```JavaScript
// before
let author = this.state.author
let text = this.state.text

// after
let {author, text} = this.state.author
```

```JavaScript
// before
let authorName = this.state.author
let fullText = this.state.text

// after
let {author: authorName, text: fullText} = this.state.author
```

```JavaScript
// before
function MyComponent(props) {
  return (
    <div style={props.style}>{props.children}</div>
  )
}

// after
function MyComponent({children, style}) {
  return (
    <div style={style}>{children}</div>
  )
}
```
