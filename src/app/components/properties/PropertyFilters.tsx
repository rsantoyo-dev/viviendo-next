"use client";
import React from "react";
import RangeSlider from "./range-slider";
import { NumberFilter } from "@/app/middleware/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const PropertyFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Handle filter changes from RangeSlider
  const handleFilterChange = (filter: NumberFilter) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("minPrice", filter.gt?.toString() || "");

    replace(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <>
      <RangeSlider onFilterChange={handleFilterChange} />
    </>
  );
};

export default PropertyFilters;
