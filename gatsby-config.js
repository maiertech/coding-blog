module.exports = {
  siteMetadata: {
    title: 'C is for Coding',
    author: 'Thilo Maier',
    description: 'A blog on full-stack web development.',
    siteUrl: 'https://coding.maier.tech',
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
      resolve: `gatsby-theme-blog`,
      options: {},
    },
    {
      resolve: `gatsby-theme-notes`,
      options: {
        basePath: `/notes`,
      },
    },
  ],
};
