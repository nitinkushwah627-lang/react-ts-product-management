import {
  useContext,
  useEffect,
  useState,
} from "react";

import ProductContext from "../context/ProductContext";
import type { Product } from "../types";

interface ProductFormProps {
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

function ProductForm({
  editingProduct,
  onCancelEdit,
}: ProductFormProps) {
  const context = useContext(ProductContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [nameError, setNameError] =
    useState("");

  const [priceError, setPriceError] =
    useState("");

  if (!context) {
    return null;
  }

  const {
    addProduct,
    updateProduct,
    adding,
  } = context;

  const validateForm = () => {
    const trimmedName = name.trim();
    const numericPrice = Number(price);

    setNameError("");
    setPriceError("");

    if (!trimmedName) {
      setNameError(
        "Product name is required"
      );
    }

    if (!price || numericPrice <= 0) {
      setPriceError(
        "Price must be greater than 0"
      );
    }

    return (
      trimmedName !== "" &&
      price !== "" &&
      numericPrice > 0
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const trimmedName = name.trim();
    const numericPrice = Number(price);

    if (editingProduct) {
      await updateProduct(
        editingProduct.id,
        trimmedName,
        numericPrice
      );
    } else {
      await addProduct(
        trimmedName,
        numericPrice
      );
    }

    setName("");
    setPrice("");
  };

  const handleCancelEdit = () => {
    setName("");
    setPrice("");
    setNameError("");
    setPriceError("");

    onCancelEdit();
  };

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(
        String(editingProduct.price)
      );
    } else {
      setName("");
      setPrice("");
    }
  }, [editingProduct]);

  return (
    <main className="form-page">
      <div className="form-card">
        <h2>
          {editingProduct
            ? "Edit Product"
            : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Product Name
            </label>

            <input
              className="input"
              type="text"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setNameError("");
              }}
              required
            />

            {nameError && (
              <p className="error">
                {nameError}
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Price
            </label>

            <input
              className="input"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setPriceError("");
              }}
              min="1"
              required
            />

            {priceError && (
              <p className="error">
                {priceError}
              </p>
            )}
          </div>

          <div className="form-actions">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={adding}
            >
              {adding
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>

            {editingProduct && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={
                  handleCancelEdit
                }
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

export default ProductForm;