import Head from "next/head";
import { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v14-pagesRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "mui-sonner";
import getLPTheme from "@styles/dark";
import { PaletteMode } from "@mui/material";
import { useState } from "react";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const [mode, setMode] = useState<PaletteMode>("dark");
  const theme = createTheme(getLPTheme(mode));

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
