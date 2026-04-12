export const resolver = {
  Query: {
    featuredListings: (_, __, { dataSources }) => {
      return dataSources.listingApi.getFeaturedListings();
    },
  },
};
