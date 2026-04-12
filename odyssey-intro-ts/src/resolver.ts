import { Resolvers } from "./types";

export const resolver: Resolvers = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingApi.getFeaturedListings();
    },
  },
};
