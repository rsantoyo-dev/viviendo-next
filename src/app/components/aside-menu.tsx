import React from "react";
import { Box, IconButton } from "@mui/material";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/solid";
import {
  ContactEmergencyOutlined,
  ViewList,
  ViewModule,
} from "@mui/icons-material";

const AsideMenu: React.FC = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} height={"100vh"}>
      <IconButton href="/dashboard/properties">
        <BuildingOfficeIcon></BuildingOfficeIcon>
      </IconButton>
      <IconButton href="/dashboard/agents">
        <ContactEmergencyOutlined />
      </IconButton>

      {/* Add other buttons here */}
    </Box>
  );
};

export default AsideMenu;
