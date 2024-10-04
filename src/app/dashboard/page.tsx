import { Fragment } from "react";
import PropertyCard from "../components/property-card";
import { Property } from "../middleware/model";
import { fetchAgents, fetchProperties } from "../middleware/requests";
import DynamicEntity from "../components/dynamic-entity";
import DynamicCard from "../components/dynamic-card";

export default async function Page() {

  const properties: Property[] = await fetchProperties();

  return (
    <DynamicEntity
      data={properties}
      defaultVisibleColumns={["civicName", "street", "sqm", "Catastro ID"]}
      groupedColumns={{
        general: ["Catastro ID"],
        location: ["street", "civicName", "state", "country"],
        characteristics: ["sqm", "rooms", "bathrooms", "elevator", "pool"],
      }}

    />


  );
}
