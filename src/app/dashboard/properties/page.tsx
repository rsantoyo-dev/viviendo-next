// app/properties/page.tsx
import {
  PropertiesConnectionResponse,
  PropertyFiltersInput,
} from "@/app/middleware/model";
import { fetchPropertiesConnection } from "@/app/middleware/requests";
import { Box, Grid2 } from "@mui/material";
import { notFound, redirect } from "next/navigation";
import Paginator from "@/app/components/paginator";
import PropertyFullView from "@/app/components/properties/property-full-view";
import ViewChanger from "@/app/components/view-changer";
import {
  Property_Plain,
} from "@/app/generated-interfaces/api/property";
import PropertiesHeader from "@/app/components/properties/properties-header";
import PropertyCard from "@/app/components/properties/property-card";
import RangeSlider from "@/app/components/properties/range-slider";
import { ViewVariant } from "@/app/middleware/ui-model";

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

  let validCurrentPage =
    isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  let propertiesConnection: PropertiesConnectionResponse;

  const filters: PropertyFiltersInput = {};

  filters.listedPrice = {};
  filters.listedPrice.gte = searchParams.minPrice
    ? parseFloat(searchParams.minPrice as string)
    : undefined;
  filters.listedPrice.lte = searchParams.maxPrice
    ? parseFloat(searchParams.maxPrice as string)
    : undefined;

  const currentPageDisplay = searchParams.display;

  console.log("currentPageDisplay:", searchParams.display);

  const sort = ["listedPrice:ASC"];

  try {
    propertiesConnection = await fetchPropertiesConnection(
      validCurrentPage,
      currentPageDisplay === ViewVariant.Grid ? PAGE_SIZE : 1,
      filters,
      sort
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    notFound();
  }

  const pageCount = propertiesConnection.pageInfo?.pageCount || 1;

  // Ensure validCurrentPage is within pageCount
  if (validCurrentPage > pageCount) {
    validCurrentPage = pageCount;
  }

  // Check if 'page' and 'pageCount' are in searchParams and correct
  const shouldRedirect =
    searchParams.page !== validCurrentPage.toString() ||
    searchParams.pageCount !== pageCount.toString();

  if (shouldRedirect) {
    // Build new searchParams
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams)) {
      if (typeof value === 'string') {
        params.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      }
    }
    params.set('page', validCurrentPage.toString());
    params.set('pageCount', pageCount.toString());

    // Redirect to the same URL with correct page and pageCount
    const destination = `/dashboard/properties?${params.toString()}`;

    // Perform the redirect
    redirect(destination);
  }

  return (
    <>
      {/* <PropertiesHeader {...propertiesConnection.pageInfo} /> */}
      {propertiesConnection?.nodes.length > 0 ? (
        <Grid2 container padding={2} spacing={6}>
          {propertiesConnection.nodes.map((property: Property_Plain) =>
            currentPageDisplay === ViewVariant.Grid ? (
              <Grid2 key={property.id} xs={2} sm={2} md={4} sx={{width:350}}>
                hello
                <PropertyCard property={property} />
              </Grid2>
            ) : (
              <PropertyFullView key={property.id} property={property} />
            )
          )}
        </Grid2>
      ) : (
        <Box>No properties found.</Box>
      )}
    </>
  );
}
