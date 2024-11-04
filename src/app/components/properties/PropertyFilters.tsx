"use client";
import React from "react";
import RangeSlider from "./range-slider";
import { NumberFilter } from "@/app/middleware/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PropertyFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Handle filter changes from RangeSlider
  const handleFilterChange = (filter: NumberFilter) => {
    console.log("Filter:", filter);
    // Clone existing search parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // Update 'gte' and 'lte' parameters
    (["gte", "lte"] as Array<keyof NumberFilter>).forEach((param) => {
      const value =
        filter[param] !== undefined
          ? Math.floor(filter[param] as number)
          : undefined;
      value !== undefined
        ? newSearchParams.set(param, value.toString())
        : newSearchParams.delete(param);
    });

    // Update the URL
    router.replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <>
      <RangeSlider
        onFilterChange={handleFilterChange}
        gte={searchParams.get("gte") ? Number(searchParams.get("gte")) : undefined}
        lte={searchParams.get("lte") ? Number(searchParams.get("lte")) : undefined}
      />
      {searchParams.get("gte")} - {searchParams.get("lte")}
    </>
  );
};

export default PropertyFilters;
