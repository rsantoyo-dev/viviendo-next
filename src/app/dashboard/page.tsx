import { Fragment } from "react";
import { Property } from "../middleware/model";
import { fetchAgents, fetchProperties } from "../middleware/requests";
import DynamicEntity from "../components/dynamic-entity-list";

export default async function Page() {

  const properties: Property[] = await fetchProperties();

  return (
    <DynamicEntity
      data={properties}
      defaultVisibleColumns={["registrationId", "address", "neighborhood", "sqm"]}
      groupedColumns={{
        general: ["registrationId"],
        location: ["address", "neighborhood", "city", "state", "country"],
        characteristics: ["sqm", "rooms", "bathrooms", "elevator", "pool"],
      }}

    />


  );
}
