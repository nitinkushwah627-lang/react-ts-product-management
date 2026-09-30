import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  Outlet,
  useParams,
} from "react-router-dom";

import { getProductById } from "../api";
import type { Product } from "../types";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    getProductById(Number(id))
      .then((data) => {
        setProduct(data);
      })
      .catch(() => {
        setError(
          "Failed to load product"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="state">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="state state-error">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="state">
        Product not found
      </div>
    );
  }

  return (
    <main className="details-page">
      <div className="details-card">
        <img
          src={
            product.image ||
            "https://dummyjson.com/image/150"
          }
          alt={product.name}
          className="details-image"
        />

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{product.price}
        </p>

        <nav className="details-tabs">
          <Link to="details">
            Details
          </Link>

          <Link to="reviews">
            Reviews
          </Link>
        </nav>

        <Outlet />
      </div>
    </main>
  );
}

export default ProductDetails;