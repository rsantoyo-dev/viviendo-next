// app/properties/page.tsx
import { PropertiesConnectionResponse, Property } from "@/app/middleware/model";
import { fetchPropertiesConnection } from "@/app/middleware/requests";
import { Box, IconButton } from "@mui/material";
import { notFound } from "next/navigation";
import Paginator from "@/app/components/paginator";
import PropertyFullView from "@/app/components/property-full-view";
import PropertyCard from "@/app/components/property-card";
import ViewList from "@mui/icons-material/ViewList";
import { ViewModule } from "@mui/icons-material";

const PAGE_SIZE = 4;

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentPageParam = searchParams.page;
  const currentPageDisplay = searchParams.display && searchParams.display; // Default to 'single'
  const currentPage = Array.isArray(currentPageParam)
    ? parseInt(currentPageParam[0], 10)
    : parseInt(currentPageParam || "1", 10);

  const validCurrentPage =
    isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  let propertiesConnection: PropertiesConnectionResponse;
  try {
    propertiesConnection = await fetchPropertiesConnection(
      validCurrentPage,
      currentPageDisplay === "grid" ? PAGE_SIZE : 1
    );
  } catch (error) {
    console.error("Error fetching properties:", error);
    notFound();
  }

  if (propertiesConnection?.nodes.length > 0) {
    return (
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box width={0.5}>
            <Paginator
              currentPage={propertiesConnection.pageInfo.page}
              totalPages={propertiesConnection.pageInfo.pageCount}
            />
          </Box>
          <IconButton>
            <ViewList></ViewList>
          </IconButton>
          <IconButton>
            <ViewModule></ViewModule>
          </IconButton>
        </Box>

        <Box display="flex" flexWrap="wrap">
          {propertiesConnection.nodes.map((property: Property) => (
            <>
              {currentPageDisplay === "grid" ? (
                <PropertyCard data={property} />
              ) : (
                <PropertyFullView data={property} />
              )}
            </>
          ))}
        </Box>
      </Box>
    );
  }

  return <div>No properties found.</div>;
}
