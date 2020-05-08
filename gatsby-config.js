module.exports = {
  siteMetadata: {
    author: 'Thilo Maier',
    title: 'C is for Coding',
    siteUrl: 'https://coding.maier.tech',
  },
  plugins: [
    {
      resolve: `gatsby-theme-notes`,
      options: {
        basePath: `/notes`,
      },
    },
  ],
};
