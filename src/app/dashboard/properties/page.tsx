import DynamicEntity from "@/app/components/dynamic-entity";
import PropertyFullView from "@/app/components/property-full-view";
import { PropertiesConnectionResponse, Property } from "@/app/middleware/model";
import { fetchNodeProperties } from "@/app/middleware/requests";
import { Box } from "@mui/material";
import { Fragment } from "react";

export default async function Page() {
  // Fetch the data
  const propertiesConnectionResponse: PropertiesConnectionResponse = await fetchNodeProperties(1,4);

  // Log the response to ensure correct type
  console.log("Fetched Properties Connection:", propertiesConnectionResponse);

  // Check if the total number of properties is greater than 0
  if (propertiesConnectionResponse?.pageInfo?.total > 0) {
    return (
      <Fragment>
        {
            // (<Box>{propertiesConnectionResponse.nodes[0].registrationId}</Box>)
            propertiesConnectionResponse.nodes.map((property: Property) => {
                return (
                    <PropertyFullView key={property.registrationId} data={property} />
                );
                }
            )
        }
      </Fragment>
    );
  }

  // Fallback if no properties are found
  return <div>No properties found.</div>;
}
