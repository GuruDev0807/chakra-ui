module.exports = {
  siteMetadata: {
    title: "Chakra UI | Design System built with React",
    description:
      "Simple, Modular and Accessible UI Components for your React Applications. Built with Styled System",
    author: "Chakra UI",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve("./src/components/layout"),
      },
    },
    `gatsby-plugin-chakra-ui`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-mdx`,
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/pages`,
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Chakra UI",
        short_name: "Chakra UI",
        start_url: "/",
        background_color: "#000000",
        theme_color: "#319795",
        display: "minimal-ui",
        icon: "../logo/logomark-colored@2x.png", // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PLT3CZ5",
        includeInDevelopment: false,
        defaultDataLayer: { platform: "gatsby" },
      },
    },
  ],
}
