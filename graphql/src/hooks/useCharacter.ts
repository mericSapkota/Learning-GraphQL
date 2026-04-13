import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const query = gql`
  query test($id: ID!) {
    character(id: $id) {
      name
      status
      image
      episode {
        name
        episode
      }
    }
  }
`;

export const useCharacter = (id: Number) => {
  const { error, data, loading } = useQuery<any>(query, {
    variables: { id },
  });
  console.log(data, ":data");
  return { error, data, loading };
};
