import DynamicEntity from "@/app/components/dynamic-entity-list";
import { fetchAgents } from "@/app/middleware/requests";
import { Agent } from "@/app/middleware/model";

const Page = async () => {
  const agents: Agent[] = await fetchAgents();

  return (
    <DynamicEntity
      data={agents}
      defaultVisibleColumns={[
        "firstName",
        "lastName",
        "agentLicenseNumber",
        "agency.name", // Agency name added as default visible column
        "city",
        "state"
      ]}
      groupedColumns={{
        general: ["firstName", "lastName", "agentLicenseNumber", "agency.name"], // Agency name in general group
        contact: ["contact.email", "contact.primaryPhone", "contact.website"],
        location: ["address", "city", "state", "country"],
      }}
    
    />
  );
};

export default Page;
