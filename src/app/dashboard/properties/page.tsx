// app/properties/page.tsx
import PropertyCard from "@/app/components/property-card"; // Renamed component
import { PropertiesConnectionResponse, Property } from "@/app/middleware/model";
import { fetchPropertiesConnection } from "@/app/middleware/requests";
import { Box } from "@mui/material";
import { Fragment } from "react";
import { notFound } from "next/navigation";
import Paginator from "@/app/components/paginator";
import PropertyFullView from "@/app/components/property-full-view";

const PAGE_SIZE = 4;

export default async function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const currentPageParam = searchParams.page;
  const currentPageDisplay = searchParams.display && searchParams.display // Default to 'single'
  const currentPage = Array.isArray(currentPageParam)
    ? parseInt(currentPageParam[0], 10)
    : parseInt(currentPageParam || "1", 10);

  const validCurrentPage = isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  let propertiesConnection: PropertiesConnectionResponse;
  try {
    propertiesConnection = await fetchPropertiesConnection(validCurrentPage, currentPageDisplay === "grid" ? PAGE_SIZE : 1);
  } catch (error) {
    console.error("Error fetching properties:", error);
    notFound();
  }

  if (propertiesConnection?.nodes.length > 0) {
    return (
      <Box>
        <Paginator
          currentPage={propertiesConnection.pageInfo.page}
          totalPages={propertiesConnection.pageInfo.pageCount}
        />
        <Box
          display="flex"
          flexWrap="wrap"
        >
         
          {propertiesConnection.nodes.map((property: Property) => (
            <Box
            p={1}
              key={property.registrationId}
              width={currentPageDisplay === "grid" ? {xs:1, md:0.33, lg:0.25} : 1} // Responsive widths
            >
              <PropertyFullView data={property} />
            </Box>
          ))}
        </Box>
        
      </Box>
    );
  }

  return <div>No properties found.</div>;
}
