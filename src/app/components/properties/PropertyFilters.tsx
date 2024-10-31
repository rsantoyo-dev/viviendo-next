"use client";
import React from "react";
import RangeSlider from "./range-slider";
import { NumberFilter } from "@/app/middleware/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PropertyFilters = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();



  // Handle filter changes from RangeSlider
  const handleFilterChange = (filter: NumberFilter) => {
    const newSearchParams = new URLSearchParams(searchParams);
    console.log(filter);

    newSearchParams.set("gte", filter.gte?.toString() || "");
    newSearchParams.set("lte", filter.lte?.toString() || "");

    replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <>
      <RangeSlider 
        onFilterChange={handleFilterChange} 
        gte={searchParams.get('gte') ? Number(searchParams.get('gte')) : undefined} 
        lte={searchParams.get('lte') ? Number(searchParams.get('lte')) : undefined} 
      />
      {searchParams.get('gte') }  -   {searchParams.get('lte') }
     </>
  );
};

export default PropertyFilters;
