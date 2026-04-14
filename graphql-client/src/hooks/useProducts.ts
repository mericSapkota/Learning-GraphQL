import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_PRODUCTS = gql`
  query Prodcuts {
    products {
      id
      name
      price
      stock
      description
    }
  }
`;
const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      id
      name
      price
      stock
      description
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation Mutation($input: CreateProductInput!) {
    createProduct(input: $input) {
      name
      price
      stock
      description
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      price
      stock
      description
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation Mutation($id: ID!) {
    deleteProduct(id: $id)
  }
`;
export const useProducts = () => {
  const { error, data, loading, refetch } = useQuery<any>(GET_PRODUCTS);
  return { error, data, loading, refetch };
};

export const useCreateProduct = () => {
  const [createProduct, { error, data, loading }] = useMutation<any>(CREATE_PRODUCT);
  return { createProduct, error, data, loading };
};

export const useDeleteProduct = () => {
  const [deleteProduct, { error, data, loading }] = useMutation<any>(DELETE_PRODUCT);
  return { deleteProduct, error, data, loading };
};

export const useUpdateProduct = () => {
  const [updateProduct, { error, data, loading }] = useMutation<any>(UPDATE_PRODUCT);
  return { updateProduct, error, data, loading };
};

export const useProduct = (id: string) => {
  const { error, data, loading } = useQuery<any>(GET_PRODUCT, {
    variables: { id },
  });
  return { error, data, loading };
};
