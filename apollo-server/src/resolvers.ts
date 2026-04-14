import { ProductModel, CreateProductInput, UpdateProductInput } from "./models/Product";

export const resolvers = {
  Query: {
    products: async () => {
      return await ProductModel.getAllProducts();
    },
    product: async (_: any, { id }: { id: string }) => {
      return await ProductModel.getProductById(parseInt(id));
    },
  },
  Mutation: {
    createProduct: async (_: any, { input }: { input: CreateProductInput }) => {
      return await ProductModel.createProduct(input);
    },
    updateProduct: async (_: any, { id, input }: { id: string; input: UpdateProductInput }) => {
      const updatedProduct = await ProductModel.updateProduct({ ...input, id: parseInt(id) });
      if (!updatedProduct) {
        throw new Error("Product not found or no updates provided");
      }
      return updatedProduct;
    },
    deleteProduct: async (_: any, { id }: { id: string }) => {
      return await ProductModel.deleteProduct(parseInt(id));
    },
  },
};
