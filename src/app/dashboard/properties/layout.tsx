// components/DashboardLayout.tsx
'use client';

import React from 'react';
import Paginator from "@/app/components/paginator";
import PriceFilter from "@/app/components/properties/PriceFilter";
import ViewChanger from "@/app/components/view-changer";
import {
  Box,
  Drawer,
  Grid2,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Side menu content
  const drawerContent = (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    >
      <IconButton
        onClick={isLargeScreen ? handleSidebarToggle : handleDrawerToggle}
        sx={{
          position: 'absolute',
          top: 8,
          right: sidebarOpen ? 8 : '50%',
          transform: sidebarOpen ? 'none' : 'translateX(50%)',
          zIndex: 1,
        }}
      >
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      {sidebarOpen && (
        <>
          <Paginator />
          <ViewChanger />
          <PriceFilter />
        </>
      )}
    </Box>
  );

  return (
    <Grid2 container sx={{ flexWrap: 'nowrap' }}>
      {/* Sidebar */}
      {isLargeScreen ? (
        <Grid2
          sx={{
            width: sidebarOpen ? '300px' : '30px',
            flexShrink: 0,
            transition: 'width 0.3s',
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          {drawerContent}
        </Grid2>
      ) : (
        <>
          {/* Main content area with menu button */}
          <Grid2
            xs
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mb: 2 }}
            >
              <MenuIcon />
            </IconButton>
            {children}
          </Grid2>

          {/* Drawer for small screens */}
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: '80%',
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      )}

      {/* Main content area for large screens */}
      {isLargeScreen && (
        <Grid2
          xs
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: 'margin-left 0.3s',
          }}
        >
          {children}
        </Grid2>
      )}
    </Grid2>
  );
}
