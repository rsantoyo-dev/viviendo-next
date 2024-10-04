// apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

export const baseURL = 'http://localhost:1337';
const client = new ApolloClient({
  uri: baseURL+'/graphql', // Replace with your Strapi GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
