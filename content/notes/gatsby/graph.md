# Gatsby Graph

## Node ownership

Nodes are owned by the plugins that create them. You can look up node ownership
under the `internal.owner` field. Once a node has been created by a plugin, it
cannot be altered by another plugin. With one exception: you can use the
[`createNodeField`](https://www.gatsbyjs.com/docs/actions/#createNodeField)
action to add a field to a node that a plugin does not own. The plugin eill then
own that field.

## createSchemaCustomization

Use `createSchemaCustomization` Node API method to get access to the
`createTypes` action. This action is used to define GraphQL types using the
[GraphQL schema definition language](https://graphql.org/learn/schema/#type-system).

The following customization controls can be applied to types:

| Control      | Description                                                     |
| :----------- | :-------------------------------------------------------------- |
| `@infer`     | Anything which does not exist on the type will be inferred.     |
| `@dontInfer` | Anything which does not exist on the type will not be inferred. |

The following extensions can be applied to interfaces:

| Extension        | Description                                                                                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `@nodeInterface` | Treat interface like a top level type that implements the `Node` interface. The `Node` interface adds `<type>` and `all<Type>` queries. |

The following extensions add resolver options to fields of a type:

| Extension             | Description                                   |
| :-------------------- | :-------------------------------------------- |
| `@dateformat`         | Add additional query options to a date field. |
| `@link`               | Connect to a different node.                  |
| `@fileByRelativePath` | Connect to a file node. Same as `@link`.      |
| `@proxy`              | Proxy field names from underlying node.       |
