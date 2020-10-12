# Layouts

- Components can only respond to the view port width, not to the width and
  height of their container.
- As a rule of thumb, media queries make sense only for components that change
  if the view port width changes.
- Layout components will probably make the most use of media queries
- For the average dumb component the only thing that changes with a media query
  is font size and / or spacing
- Component libraries are highly overrated. Components tend to have too many
  properties to allow for all kinds of use cases. You end up configuring a lot.
  Might be easier to just write a more simple component that does what you want.
- Library for small components might make sense.

# Layout vs Template vs Component

- Component consists of other components and is not aware of template or layout.
- Template consists of one or more components and are the first abstraction
  towards a web page. Template is not aware of layout.
- Layouts are normally shared across templates. They are the final step towards
  a web page. A layout is embedded into a HTML page.

Gatsby knows the notion off a layouts and templates. Only difference is that it
enriches them with GraphQL queries.
