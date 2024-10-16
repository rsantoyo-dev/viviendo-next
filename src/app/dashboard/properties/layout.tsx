
import { Box } from "@mui/material";


export default async function DashboardLayout({
  children, // will be a page or nested layoutnpm install @mui/icons-material @mui/material @emotion/styled @emotion/react
}: {
  children: React.ReactNode;
}) {

  return (
    <Box>

        {children}
    </Box>
  );
}
