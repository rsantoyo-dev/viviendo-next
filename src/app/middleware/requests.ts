import client from "../apolloClient";
import { Agent, PropertiesConnectionResponse, Property } from "./model";
import {
  LIST_AGENTS_QUERY,
  LIST_PROPERTIES_QUERY,
  UPDATE_AGENT_MUTATION,
  UPDATE_PROPERTY_MUTATION,
} from "./strapiQueries";
import gql from "graphql-tag";

export async function fetchNodeProperties(
  page: number = 1,
  pageSize: number = 3
): Promise<PropertiesConnectionResponse> {
  try {
    const { data } = await client.query<{
      properties_connection: PropertiesConnectionResponse;
    }>({
      query: gql`
        query Nodes($pagination: PaginationArg) {
          properties_connection(pagination: $pagination) {
            nodes {
              listedPrice
              propertyStatus
              location {
                address
                neighborhood
                borough
                city
                codePostal
                lat
                long
                country
                state
              }
              characteristics {
                rooms
                bathrooms
              }
            }
            pageInfo {
              page
              pageCount
              pageSize
              total
            }
          }
        }
      `,
      variables: {
        pagination: {
          page,
          pageSize,
        },
      },
      fetchPolicy: "no-cache", // Ensures the data is not cached
    });

    return data?.properties_connection  as PropertiesConnectionResponse
  } catch (error) {
    console.error("Error fetching properties:", error);
    return { nodes: [], pageInfo: { page: 1, pageCount: 1, pageSize: pageSize, total: 0 } } as PropertiesConnectionResponse;
  }
}

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
  try {
    // Construct the mutation dynamically based on the passed property
    const { data } = await client.mutate({
      mutation: UPDATE_PROPERTY_MUTATION,
      variables: {
        documentId,
        data: {
          location: {
            address:
              property.location?.address !== null
                ? property.location?.address
                : null,
            civicName:
              property.location?.civicName !== null
                ? property.location?.civicName
                : null,
            codePostal:
              property.location?.codePostal !== null
                ? property.location?.codePostal
                : null,
            country:
              property.location?.country !== null
                ? property.location?.country
                : null,
            lat:
              property.location?.lat !== null ? property.location?.lat : null,
            long:
              property.location?.long !== null ? property.location?.long : null,
            state:
              property.location?.state !== null
                ? property.location?.state
                : null,
            street:
              property.location?.street !== null
                ? property.location?.street
                : null,
            city:
              property.location?.city !== null ? property.location?.city : null,
          },
          characteristics: {
            sqMts:
              property.characteristics?.sqMts !== null
                ? parseInt(
                    property.characteristics?.sqMts as unknown as string,
                    10
                  )
                : null,
            bathrooms:
              property.characteristics?.bathrooms !== null
                ? parseInt(
                    property.characteristics?.bathrooms?.toString() || "0",
                    10
                  )
                : null,
            elevator:
              property.characteristics?.elevator !== null
                ? Boolean(property.characteristics?.elevator)
                : null,
            pool:
              property.characteristics?.pool !== null
                ? Boolean(property.characteristics?.pool)
                : null,
            rooms:
              property.characteristics?.rooms !== null
                ? property.characteristics?.rooms
                : null,
            vigilanceSystem:
              property.characteristics?.vigilanceSystem !== null
                ? Boolean(property.characteristics?.vigilanceSystem)
                : null,
          },
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
      // Ensure cache is updated
      refetchQueries: [{ query: LIST_AGENTS_QUERY }],
    });
    return data?.updateAgent?.agent ?? null;
  } catch (error) {
    console.error("Error updating agent:", error);
    return null;
  }
}
