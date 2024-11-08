"use client";
import React, { useState, ChangeEvent } from "react";
import RangeSlider from "./range-slider"; // Ensure this component handles integers
import { NumberFilter } from "@/app/middleware/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, TextField, Box, Grid, Typography } from "@mui/material";

const PriceFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Initialize filters state with integer values from searchParams if available
  const [filters, setFilters] = useState<NumberFilter>({
    gte: searchParams.get("gte") ? parseInt(searchParams.get("gte") as string, 10) : undefined,
    lte: searchParams.get("lte") ? parseInt(searchParams.get("lte") as string, 10) : undefined,
  });

  // Handle input changes for 'gte' and 'lte' ensuring only integers are set
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Use regex to remove non-integer characters
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    setFilters((prev) => ({
      ...prev,
      [name]: sanitizedValue === "" ? undefined : parseInt(sanitizedValue),
    }));
  };

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    const priceFilterKeys: (keyof NumberFilter)[] = ["gte", "lte"];

    priceFilterKeys.forEach((key) => {
      if (filters[key] !== undefined && !isNaN(filters[key]!)) {
        newSearchParams.set(key, filters[key]!.toString());
      } else {
        newSearchParams.delete(key);
      }
    });

    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <Box sx={{ padding: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Grid container spacing={3}>
        {/* Row 1: Input Fields */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Minimum Price"
                name="gte"
                type="number"
                value={filters.gte ?? ""}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  inputProps: { 
                    min: 0, 
                    step: 1, 
                    inputMode: "numeric", 
                    pattern: "[0-9]*" 
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Maximum Price"
                name="lte"
                type="number"
                value={filters.lte ?? ""}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                InputProps={{
                  inputProps: { 
                    min: 0, 
                    step: 1, 
                    inputMode: "numeric", 
                    pattern: "[0-9]*" 
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Row 2: Range Slider */}
        <Grid item xs={12}>
          <Typography gutterBottom>Price Range</Typography>
          <RangeSlider
            onFilterChange={setFilters}
            gte={filters.gte}
            lte={filters.lte}
          />
        </Grid>

        {/* Row 3: Apply Button */}
        <Grid item xs={12}>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Apply
            </Button>
          </Grid>
        </Grid>

        {/* Row 4: Display Current Filters */}
        <Grid item xs={12}>
          <Box mt={2}>
            <Typography variant="subtitle1">
              Current Filters:{" "}
              <strong>
                {filters.gte !== undefined ? filters.gte : "Any"} -{" "}
                {filters.lte !== undefined ? filters.lte : "Any"}
              </strong>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PriceFilter;
