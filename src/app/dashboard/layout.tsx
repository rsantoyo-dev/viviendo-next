"use client";
import React from "react";
import NavDash from "../components/nav-dash";
import AsideMenu from "../components/aside-menu";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { darkTheme, lightTheme } from "../ui/theme";

export default function DashboardLayout({
  children, // will be a page or nested layoutnpm install @mui/icons-material @mui/material @emotion/styled @emotion/react
}: {
  children: React.ReactNode;
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <section>
        <NavDash />
        <div className="flex">
          {/* Sidebar */}
          <AsideMenu />

          {/* Main content area with a light soft gradient */}
          <main className="flex-1 p-2 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
            {children}
          </main>
        </div>
      </section>
    </ThemeProvider>
  );
}
