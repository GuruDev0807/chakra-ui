const sidebar = {
  routes: [
    {
      title: "Guides",
      heading: true,
      routes: [
        {
          title: "How to Create a guide",
          path: "/guides/how-to-create-a-guide",
        },
        {
          title: "Portals and z-Index",
          path: "/guides/z-index",
        },
        {
          title: "Nextjs Optimization",
          path: "/guides/nextjs-optimization",
        },
        {
          title: "Integrations",
          path: "/guides/integrations",
          open: true,
          routes: [
            {
              title: "Create React App",
              path: "/guides/integrations/with-cra",
            },
            {
              title: "Framer Motion",
              path: "/guides/integrations/with-framer",
            },
            {
              title: "React Hook Form",
              path: "/guides/integrations/with-hook-form",
            },
          ],
        },
      ],
    },
  ],
}

export default sidebar
