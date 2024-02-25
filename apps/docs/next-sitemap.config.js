/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://mui-sonner.tsotne.co.uk",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  sitemapSize: 100,
  output: "export",
  additionalPaths: async () => [
    {
      loc: "/",
      priority: "1.0",
    },
    {
      loc: "/getting-started",
      priority: 0.9,
    },
    {
      loc: "/toast",
      priority: 0.7,
    },
    {
      loc: "/toaster",
      priority: 0.7,
    },
    {
      loc: "/styling",
      priority: 0.7,
    },
  ],
};
