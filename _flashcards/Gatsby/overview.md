# Gatsby Overview

Gatsby has a GraphQL layer to extract the data required for a page. GraphQL
layer pulls only the data required for a page. Each page has its own specific
generated JSON file from which data is pulled into templates.

Gatsby has incremental rebuild from the get go.

Markdown is just another data source.

Attaching image nodes to markdown nod s is a bad idea because the moment the
markdown changes in dev mode the node is deleted and recreated. Any child nodes
are deleted for good.
