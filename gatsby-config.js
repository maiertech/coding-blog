const pkg = require('./package.json');

module.exports = {
  siteMetadata: {
    siteTitle: "Thilo's Digital Garden",
    seoTitle: "Thilo Maier's Digital Garden",
    siteAuthor: 'Thilo Maier',
    siteDescription: pkg.description,
    siteUrl: pkg.homepage,
    siteTwitter: 'maiertech',
    siteNavLinks: [
      { href: '/posts/', text: 'Posts' },
      { href: '/chunks/', text: 'Chunks' },
      { href: '/notes/', text: 'Notes' },
      { href: '/about/', text: 'About' },
    ],
  },
  plugins: ['@maiertech/gatsby-theme-digital-garden'],
};
