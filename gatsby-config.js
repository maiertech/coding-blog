const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteTitle: 'coding.maier.dev',
    seoTitle: "Thilo Maier's digital garden on web development",
    siteAuthor: 'Thilo Maier',
    siteDescription: pkg.description,
    siteUrl: pkg.homepage,
    siteTwitter: '454de6e',
    siteNavLinks: [
      { href: '/posts/', text: 'Posts' },
      { href: '/notes/', text: 'Notes' },
      { href: '/about/', text: 'About' },
    ],
  },
  plugins: ['@maiertech/gatsby-theme-digital-garden'],
};
