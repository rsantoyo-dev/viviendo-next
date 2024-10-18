"use client";
import React from "react";
import NavDash from "../components/nav-dash";
import AsideMenu from "../components/aside-menu";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../ui/theme";

export default function DashboardLayout({
  children, // will be a page or nested layoutnpm install @mui/icons-material @mui/material @emotion/styled @emotion/react
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>

      <Box component="section">
        <NavDash />

        <Box display="flex">
          <AsideMenu />
          <Box
            component="main"
            flexGrow={1}
      
          >
            {children}
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
