import client from "../apolloClient";
import { Agent, Property } from "./model";
import {
  LIST_AGENTS_QUERY,
  LIST_PROPERTIES_QUERY,
  UPDATE_AGENT_MUTATION,
  UPDATE_PROPERTY_MUTATION,
} from "./strapiQueries";


// Fetch Properties
export async function fetchProperties(): Promise<Property[]> {
  try {
    const { data } = await client.query<{ properties: Property[] }>({
      query: LIST_PROPERTIES_QUERY,
      fetchPolicy: "no-cache", // Ensures that the data is not cached
    });
    return data?.properties ?? [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Fetch Agents
export async function fetchAgents(): Promise<Agent[]> {
  try {
    const { data } = await client.query<{ agents: Agent[] }>({
      query: LIST_AGENTS_QUERY,
      fetchPolicy: "no-cache", // Ensures that the data is not cached
    });
    return data?.agents ?? [];
  } catch (error) {
    console.error("Error fetching agents:", error);
    return [];
  }
}

// Update Property - Dynamic structure based on the input Property object
export async function updateProperty(
  documentId: string,
  property: Property
): Promise<Property | null> {
  console.log('updateProperty', documentId, property);
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_PROPERTY_MUTATION,
      variables: {
        documentId,
        data: {
          location: {
            address: property.location?.address || null,
            civicName: property.location?.civicName || null,
            codePostal: property.location?.codePostal || null,
            country: property.location?.country || null,
            lat: property.location?.lat || null,
            long: property.location?.long || null,
            state: property.location?.state || null,
            street: property.location?.street || null,
            city: property.location?.city || null
          },
          characteristics: {
            sqMts: property.characteristics?.sqMts || null,
            bathrooms: property.characteristics?.bathrooms || null,
            elevator: property.characteristics?.elevator || null,
            pool: property.characteristics?.pool || null,
            rooms: property.characteristics?.rooms || null,
            vigilanceSystem: property.characteristics?.vigilanceSystem || null
          }
        },
      },
      refetchQueries: [{ query: LIST_PROPERTIES_QUERY }],
    });

    console.log("Property updated successfully:", data);
    return data?.updateProperty ?? null;
  } catch (error) {
    console.error("Error updating property:", error);
    return null;
  }
}


// Update Agent
export async function updateAgent(
  id: string,
  input: Agent
): Promise<Agent | null> {
  try {
    const { data } = await client.mutate({
      mutation: UPDATE_AGENT_MUTATION,
      variables: {
        id,
        input: {
          firstName: input.firstName,
          lastName: input.lastName,
          agentLicenseNumber: input.agentLicenseNumber,
          contact: input.contact,
          agency: input.agency,
          location: input.location,
        },
      },
      refetchQueries: [{ query: LIST_AGENTS_QUERY }],
    });
    return data?.updateAgent?.agent ?? null;
  } catch (error) {
    console.error("Error updating agent:", error);
    return null;
  }
}

