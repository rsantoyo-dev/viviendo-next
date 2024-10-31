// app/components/properties/ViewChanger.tsx
"use client";

import { ViewList, ViewModule } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ViewChanger = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  // Derive the current view mode from the 'display' query parameter. Default to 'single' if not present.
  const display = searchParams.get("display");
  console.log("display:", display);

  // Handler to change the view mode
  const handleViewChange = (newView: string) => {
    // Clone existing search parameters to preserve other query params like 'minPrice' and 'maxPrice'
    
    const newSearchParams = new URLSearchParams(searchParams.toString());

    console.log("newView:", newView);

     newSearchParams.set("display", newView);

    // // // Update the URL with the new search parameters without adding a new history entry
     replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Box>
      <IconButton
        onClick={() => handleViewChange("single")}
        color={display === "single" ? "primary" : "default"}
        aria-label="Single View"
        aria-pressed={display === "single"}
      >
        <ViewList />
      </IconButton>
      <IconButton
        onClick={() => handleViewChange("grid")}
        color={display === "grid" ? "primary" : "default"}
        aria-label="Grid View"
        aria-pressed={display === "grid"}
      >
        <ViewModule />
      </IconButton>
    </Box>
  );
};

export default ViewChanger;
