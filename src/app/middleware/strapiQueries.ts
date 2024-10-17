import { gql } from "@apollo/client";

// Mutation to update property details
export const UPDATE_PROPERTY_MUTATION = gql`
  mutation UpdateProperty($documentId: ID!, $data: PropertyInput!) {
    updateProperty(documentId: $documentId, data: $data) {
      __typename
      catastroId
      registrationId
      media {
        __typename
        previewUrl
        caption
        url
        name
      }
      location {
        __typename
        id
       address
        codePostal
        country
        lat
        long
        state
      }
      characteristics {
        __typename
        sqMts
        bathrooms
        elevator
        pool
        rooms
        vigilanceSystem
      }
    }
  }
`;

// Mutation to update agent details
export const UPDATE_AGENT_MUTATION = gql`
  mutation UpdateAgent($id: ID!, $input: AgentInput!) {
    updateAgent(id: $id, input: $input) {
      __typename
      agent {
        __typename
        firstName
        lastName
        agentLicenseNumber
        contact {
          email
          primaryPhone
          website
        }
        agency {
          name
        }
        location {
          __typename
          address
          city
          state
          codePostal
          country
          lat
          long
        }
      }
    }
  }
`;

export const PROPERTIES_CONNECTION_QUERY = gql`
query Nodes($pagination: PaginationArg, $sort: [String], $filters: PropertyFiltersInput, $status: PublicationStatus) {
  properties_connection(pagination: $pagination, sort: $sort, filters: $filters, status: $status) {
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
      
      propertyType
      building {
        attached
        buildYear
        bungalow
        century
        detached
        id
        livingArea
        newConstruction
        semiDetached
        splitLevel
      }
      features {
        bathrooms
        elevator
        indoorParking
        outdoorParking
        petsFriendly
        pool
        reducedMobility
        rooms
        sqMts
        vigilanceSystem
        waterAccess
        waterFront
      }
      media {
        url
        name
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

`;

export const LIST_PROPERTIES_QUERY = gql`
  query Properties {
    properties {
      __typename
      documentId
      catastroId
      registrationId
      media {
        __typename
        previewUrl
        caption
        url
        name
        formats
      }
      location {
        __typename
        id
        address
        codePostal
        country
        lat
        long
        state
        
      }
      characteristics {
        __typename
        id
        sqMts
        bathrooms
        elevator
        pool
        rooms
        vigilanceSystem
      }
    }
  }
`;

export const LIST_AGENTS_QUERY = gql`
  query Agents {
    agents {
      firstName
      lastName
      agentLicenseNumber
      agency {
        name
      }
      contact {
        email
        primaryPhone
        website
      }
      location {
        address
        city
        state
        long
        codePostal
        country
        lat
        id
      }
    }
  }
`;
