import {
  createContext,
  useEffect,
  useState,
} from "react";

import type { Product } from "../types";

import {
  getProducts,
  addProduct as addProductApi,
  updateProduct as updateProductApi,
  deleteProduct as deleteProductApi,
} from "../api";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: string;
  adding: boolean;

  addProduct: (
    name: string,
    price: number
  ) => Promise<void>;

  updateProduct: (
    id: number,
    name: string,
    price: number
  ) => Promise<void>;

  deleteProduct: (
    id: number
  ) => Promise<void>;

  editingProduct: Product | null;

  editProduct: (
    id: number
  ) => void;

  cancelEdit: () => void;
}

const ProductContext =
  createContext<ProductContextType | null>(
    null
  );

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [adding, setAdding] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  // GET products
  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch(() => {
        setError(
          "Failed to load products"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // ADD product
  const addProduct = async (
    name: string,
    price: number
  ) => {
    try {
      setAdding(true);
      setError("");

      const newProduct =
        await addProductApi(
          name,
          price
        );

      setProducts((prevProducts) => [
        ...prevProducts,
        newProduct,
      ]);
    } catch {
      setError(
        "Failed to add product"
      );
    } finally {
      setAdding(false);
    }
  };

  // UPDATE product
  const updateProduct = async (
    id: number,
    name: string,
    price: number
  ) => {
    try {
      setError("");

      const updatedProduct =
        await updateProductApi(
          id,
          name,
          price
        );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id
            ? updatedProduct
            : product
        )
      );

      setEditingProduct(null);
    } catch {
      setError(
        "Failed to update product"
      );
    }
  };

  // DELETE product
  const deleteProduct = async (
    id: number
  ) => {
    try {
      setError("");

      await deleteProductApi(id);

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product.id !== id
        )
      );

      if (
        editingProduct?.id === id
      ) {
        setEditingProduct(null);
      }
    } catch {
      setError(
        "Failed to delete product"
      );
    }
  };

  // START EDIT
  const editProduct = (
    id: number
  ) => {
    const product = products.find(
      (product) =>
        product.id === id
    );

    if (product) {
      setEditingProduct(product);
    }
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        adding,

        addProduct,
        updateProduct,
        deleteProduct,

        editingProduct,
        editProduct,
        cancelEdit,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;