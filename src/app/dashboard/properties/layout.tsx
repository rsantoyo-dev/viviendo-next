

import AsideMenu from "@/app/components/aside-menu";
import NavDash from "@/app/components/nav-dash";
import { Property } from "@/app/middleware/model";
import { fetchProperties } from "@/app/middleware/requests";
import { theme } from "@/app/ui/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CssBaseline } from "@mui/material";


export default async function DashboardLayout({
  children, // will be a page or nested layoutnpm install @mui/icons-material @mui/material @emotion/styled @emotion/react
}: {
  children: React.ReactNode;
}) {

  return (
    <Box padding={2}>

        {children}
    </Box>
  );
}
