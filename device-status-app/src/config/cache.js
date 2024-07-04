import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        appliances: {
          keyArgs: false, // Disable default keyArgs
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        appliance: {
          keyArgs: ["applianceId"], // Use applianceId as the key for individual appliance
          read(existing, { args, toReference }) {
            return (
              existing ||
              toReference({
                __typename: "appliance",
                serialNo: args.applianceId,
              })
            );
          },
        },
      },
    },
    appliance: {
      keyFields: ["serialNo"], // Use serialNo as the unique identifier for appliance type
    },
  },
});
