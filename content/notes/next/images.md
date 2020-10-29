# next/image

Prior art: [image processing for Gatsby](/notes/gatsby/images/).

Gatsby was the first framework to introduce easy image processing for fixed and
fluid images. It came at the expense of long build times and could be mitigated
by using proprietary cloud services to move image processing over to the cloud
or by using proprietary services to parallelize image processing during the
build and avoid unnencessary reprocessing by keeping the cache around.

`next/image` takes a radically different approach. When hosted on Vercel, it's
Image component can dynamically trigger image processing on the edge network and
the component will serve an optimized pre-processed image. This is done when
needed and not during the build process. The `Image` component completely
abstracts away the complexity of an API like Cloudinary or imgIX. This is
superior to any other approach, but it is tightly coupled to hosting on Vercel.
It should not be too difficult to port the `Image` component to Gatsby use and
compelelty do away with image processing via GraphQL queries.

- https://nextjs.org/docs/api-reference/next/image
- https://vercel.com/docs/next.js/image-optimization
- https://nextjs.org/docs/basic-features/image-optimization
