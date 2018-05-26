module.exports = {
  siteMetadata: {
    author: "Thilo Maier",
    title: "Coding for the Web",
    siteUrl: "https://www.codingfortheweb.blog"
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: ["gatsby-remark-autolink-headers", "gatsby-remark-smartypants"]
      }
    },
    "gatsby-plugin-blog",
    "gatsby-plugin-react-helmet"
  ]
};
