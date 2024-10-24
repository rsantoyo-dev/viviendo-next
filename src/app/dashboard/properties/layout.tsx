
import { Box } from "@mui/material";


const PAGE_SIZE = 4;


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Box>

        {children}
    </Box>
  );
}
