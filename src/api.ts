import axios from "axios";
import type {
  ApiResponse,
  Product,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL;
const FALLBACK_IMAGE = "https://dummyjson.com/image/150";

// GET all products
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get<ApiResponse>(
    API_URL
  );

  return response.data.products.map((product) => ({
    id: product.id,
    name: product.title,
    price: product.price,
    image: product.thumbnail || FALLBACK_IMAGE,
  }));
};

// GET single product
export const getProductById = async (
  id: number
): Promise<Product> => {
  const response = await axios.get(
    `${API_URL}/${id}`
  );

  return {
    id: response.data.id,
    name: response.data.title,
    price: response.data.price,
    image:
      response.data.thumbnail ||
      response.data.image ||
      FALLBACK_IMAGE,
  };
};

// POST product
export const addProduct = async (
  name: string,
  price: number
): Promise<Product> => {
  const response = await axios.post(
    `${API_URL}/add`,
    {
      title: name,
      price: price,
    }
  );

  return {
    id: response.data.id,
    name: response.data.title,
    price: response.data.price,
    image:
      response.data.thumbnail ||
      response.data.image ||
      FALLBACK_IMAGE,
  };
};

// PUT product
export const updateProduct = async (
  id: number,
  name: string,
  price: number
): Promise<Product> => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    {
      title: name,
      price: price,
    }
  );

  return {
    id: response.data.id,
    name: response.data.title,
    price: response.data.price,
    image:
      response.data.thumbnail ||
      response.data.image ||
      FALLBACK_IMAGE,
  };
};

// DELETE product
export const deleteProduct = async (
  id: number
): Promise<void> => {
  await axios.delete(
    `${API_URL}/${id}`
  );
};