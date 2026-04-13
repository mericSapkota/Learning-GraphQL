import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        name
        image
        id
      }
    }
  }
`;

export const useCharacters = () => {
  const { error, data, loading } = useQuery<any>(GET_CHARACTERS);
  console.log(data, ":data");
  return { error, data, loading };
};
