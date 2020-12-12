const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteTitle: 'coding.maier.dev',
    siteAuthor: 'Thilo Maier',
    description: pkg.description,
    siteUrl: pkg.homepage,
    siteTwitter: '454de6e',
  },
  plugins: ['@maiertech/gatsby-theme-digital-garden'],
};
