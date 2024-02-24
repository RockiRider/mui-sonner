export default {
  logo: <span style={{ fontWeight: 600 }}>MUI Sonner</span>,
  project: {
    link: "https://github.com/RockiRider/mui-sonner",
  },
  docsRepositoryBase:
    "https://github.com/RockiRider/mui-sonner/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | MUI Sonner",
    };
  },
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://mui-sonner.tsotne.co.uk" target="_blank">
          MUI Sonner
        </a>
        .
      </span>
    ),
  },
};
