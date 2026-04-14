// client/src/components/AddProduct.tsx
import { useForm } from "react-hook-form";
import { useCreateProduct, useProduct, useUpdateProduct } from "../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface FormData {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const AddProduct = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  // ✅ Hooks must be called at the top level, not inside useEffect
  const { data: productData, loading: productLoading } = useProduct(id || "");
  const { createProduct, loading, error } = useCreateProduct();
  const { updateProduct, loading: updateLoading, error: updateError } = useUpdateProduct();

  // ✅ Populate form when product data loads in edit mode
  useEffect(() => {
    if (isEditMode && productData?.product) {
      reset({
        name: productData.product.name,
        description: productData.product.description,
        price: productData.product.price,
        stock: productData.product.stock,
      });
    }
  }, [isEditMode, productData, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditMode && id) {
        // ✅ Update existing product
        await updateProduct({
          variables: {
            id,
            input: {
              name: data.name,
              description: data.description,
              price: data.price,
              stock: data.stock,
            },
          },
        });
        alert("Product updated successfully!");
      } else {
        // ✅ Create new product
        await createProduct({
          variables: {
            input: {
              name: data.name,
              description: data.description,
              price: data.price,
              stock: data.stock,
            },
          },
        });
        reset();
        alert("Product added successfully!");
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const goBack = () => navigate("/");

  // ✅ Show loading state while fetching product in edit mode
  if (isEditMode && productLoading) {
    return <div style={{ padding: "20px" }}>Loading product...</div>;
  }

  const activeLoading = loading || updateLoading;
  const activeError = error || updateError;

  return (
    <div style={{ padding: "20px", border: "1px solid #a19d9d", margin: "20px" }}>
      <button onClick={goBack}>Back</button>
      <h2>{isEditMode ? "Edit Product" : "Add New Product"}</h2>

      {activeError && <div style={{ color: "red", marginBottom: "10px" }}>Error: {activeError.message}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input {...register("name", { required: true })} type="text" style={{ marginLeft: "10px", padding: "5px" }} />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Description: </label>
          <input
            {...register("description", { required: true })}
            type="text"
            style={{ marginLeft: "10px", padding: "5px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Price: </label>
          <input
            {...register("price", { required: true, valueAsNumber: true })}
            type="number"
            step="0.01"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Stock: </label>
          <input
            {...register("stock", { required: true, valueAsNumber: true })}
            type="number"
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </div>
        <button
          type="submit"
          disabled={activeLoading || isSubmitting}
          style={{
            padding: "8px 16px",
            backgroundColor: isEditMode ? "#28a745" : "#007bff",
            color: "white",
            border: "none",
            cursor: activeLoading ? "not-allowed" : "pointer",
          }}
        >
          {activeLoading || isSubmitting
            ? isEditMode
              ? "Updating..."
              : "Adding..."
            : isEditMode
              ? "Update Product"
              : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
