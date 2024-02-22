import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getLPTheme from "@styles/dark";
import { PaletteMode } from "@mui/material";
import { useState } from "react";
import CustomToaster from "@components/CustomToaster";

const defaultTheme = createTheme({});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [mode, setMode] = useState<PaletteMode>("dark");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const customTheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={showCustomTheme ? customTheme : defaultTheme}>
        <CssBaseline />
        <CustomToaster />
        <Component
          {...pageProps}
          toggleTheme={toggleCustomTheme}
          toggleColorMode={toggleColorMode}
          showCustomTheme={showCustomTheme}
        />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
