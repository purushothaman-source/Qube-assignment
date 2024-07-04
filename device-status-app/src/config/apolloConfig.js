import React from "react";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  split,
} from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import { onError } from "@apollo/client/link/error";
import { asyncMap, getMainDefinition } from "@apollo/client/utilities";
import { RestLink } from "apollo-link-rest";
import { cache } from "./cache.js";
import { Mixpanel } from "../mixpanel/mixpanel_config.js";

const createApolloClient = async () => {
  // Configure the REST Link with your API endpoint
  console.log(process.env.REACT_APP_BASE_URL);
  const restLink = new RestLink({
    uri: `${process.env.REACT_APP_BASE_URL}/api/v1`, // Your REST API base URL
  });

  // Create an error link for logging errors
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        Mixpanel.track(
          "GraphQL error",
          {
            error: `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          },
          "error"
        );
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      Mixpanel.track(
        "Network error",
        {
          error: networkError,
        },
        "error"
      );
      console.error(`[Network error]: ${networkError}`);
    }
  });

  const addLogs = new ApolloLink((operation, forward) => {
    Mixpanel.track("apollo_request_started", {
      request_name: operation?.operationName,
      variables: operation?.variables,
      user: JSON.parse(sessionStorage.getItem("user"))?.username || "",
    });

    return asyncMap(forward(operation), async (response) => {
      Mixpanel.track("apollo_request_completed", {
        request_name: operation?.operationName,
        variables: operation?.variables,
        user: JSON.parse(sessionStorage.getItem("user"))?.username || "",
        response: response,
      });

      return response;
    });
  });

  // Chain links
  const apolloLink = ApolloLink.from([addLogs, errorLink, restLink]);

  // Split links for efficiency and scalability
  const splitLink = split(({ query }) => {
    const { kind } = getMainDefinition(query);
    return kind === "OperationDefinition";
  }, apolloLink);

  // Await before instantiating ApolloClient, else queries might run before the cache is persisted
  await persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  // Create the Apollo Client instance
  return new ApolloClient({
    link: splitLink,
    cache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
    connectToDevTools: true,
  });
};

// Higher-order component for Apollo Provider
export const Apollo = ({ children }) => {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    createApolloClient().then(setClient);
  }, []);

  if (!client) return <div>Loading...</div>;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
