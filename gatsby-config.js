module.exports = {
  siteMetadata: {
    title: 'c4g digital garden',
    author: 'Thilo Maier',
    description: "Thilo Maier's digital garden for full-stack web development.",
    siteUrl: 'https://coding.maier.dev',
    social: [
      {
        name: 'Twitter',
        url: 'https://twitter.com/454de6e',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/454de6e',
      },
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-theme-blog',
      options: {
        basePath: '/blog',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: 'gatsby-theme-notes',
      options: {
        basePath: '/notes',
        mdxOtherwiseConfigured: true,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: { extensions: ['.md', '.mdx'] },
    },
    'gatsby-plugin-catch-links',
    // Override gatsby-plugin-theme-ui in blog and notes themes.
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {},
    },
  ],
};
