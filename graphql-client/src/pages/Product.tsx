import { useEffect } from "react";
import { useDeleteProduct, useProducts } from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export default function Product() {
  const { error, data, loading, refetch } = useProducts();
  const { deleteProduct: deleteProductMutation } = useDeleteProduct();

  useEffect(() => {
    refetch();
  }, []);
  const navigate = useNavigate();

  const goToAddProduct = () => {
    navigate("/add-product");
  };

  const deleteProduct = (id: string) => {
    deleteProductMutation({
      variables: {
        id,
      },
    });
    refetch();
  };
  // display all products and its details

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div>
        <button onClick={goToAddProduct}>Create Product</button>{" "}
      </div>
      <div>
        <h1>All Products</h1>
        {data.products.map((product: any) => (
          <div key={product.id}>
            <br></br>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <p>Description: {product.description}</p>
            <button onClick={() => deleteProduct(product.id)}>Delete Product</button>
            {"   "}
            <button onClick={() => navigate(`/add-product/${product.id}`)}>Edit Product</button>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  );
}
