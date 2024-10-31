// app/properties/page.tsx
import { PropertiesConnectionResponse, PropertyFiltersInput } from "@/app/middleware/model";
import { fetchPropertiesConnection } from "@/app/middleware/requests";
import { Box, Grid2, IconButton } from "@mui/material";
import { notFound } from "next/navigation";
import Paginator from "@/app/components/paginator";
import PropertyFullView from "@/app/components/properties/property-full-view";
import ViewChanger from "@/app/components/view-changer";
import { Property, Property_Plain } from "@/app/generated-interfaces/api/property";
import PropertiesHeader from "@/app/components/properties/properties-header";
import PropertyCard from "@/app/components/properties/property-card";
import RangeSlider from "@/app/components/properties/range-slider";

const PAGE_SIZE = 4;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPageParam = searchParams.page;
  
  const currentPage = Array.isArray(currentPageParam)
    ? parseInt(currentPageParam[0], 10)
    : parseInt(currentPageParam || "1", 10);

  const validCurrentPage =
    isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  let propertiesConnection: PropertiesConnectionResponse;

  const minPriceParam = searchParams.minPrice;


  const filters: PropertyFiltersInput = {};

  filters.listedPrice = {};
  filters.listedPrice.gte = searchParams.minPrice ? parseFloat(searchParams.minPrice as string) : undefined;
  filters.listedPrice.lte = searchParams.maxPrice ? parseFloat(searchParams.maxPrice as string) : undefined;



  const currentPageDisplay = searchParams.display;
  
  console.log('currentPageDisplay:', searchParams.display);

  const sort = ["listedPrice:ASC"];

  try {
    propertiesConnection = await fetchPropertiesConnection(
      validCurrentPage,
      currentPageDisplay === "grid" ? PAGE_SIZE : 1,
      filters,
      sort
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    notFound();
  }

 
  return (
    <Box>
      <PropertiesHeader {...propertiesConnection.pageInfo} />
      {propertiesConnection?.nodes.length > 0 ? (
        <Grid2 container padding={2} spacing={6}>
          {propertiesConnection.nodes.map((property: Property_Plain) => (
            <>
              {currentPageDisplay === "grid" ? (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
                  <PropertyCard property={property} />
                </Grid2>
              ) : (
                <PropertyFullView property={property} />
              )}
            </>
          ))}
        </Grid2>
      ) : (
        <div>No properties found.</div>
      )}
    </Box>
  );
}
