import {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import ProductCard from "../components/ProductCard";
import ProductContext from "../context/ProductContext";

interface ProductsProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

function Products({
  onEdit,
  onDelete,
}: ProductsProps) {
  const context = useContext(ProductContext);

  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] =
    useState(1);

  const productsPerPage = 5;

  if (!context) {
    return null;
  }

  const {
    products,
    loading,
    error,
  } = context;

  const filteredProducts =
    products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesPrice =
        maxPrice === "" ||
        product.price <= Number(maxPrice);

      return (
        matchesSearch &&
        matchesPrice
      );
    });

  const sortedProducts =
    [...filteredProducts].sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  const startIndex =
    (currentPage - 1) * productsPerPage;

  const paginatedProducts =
    sortedProducts.slice(
      startIndex,
      startIndex + productsPerPage
    );

  const totalPages =
    Math.ceil(
      sortedProducts.length /
        productsPerPage
    );

  // Hook ko conditional return se pehle rakha
  useEffect(() => {
    if (
      currentPage > totalPages &&
      totalPages > 0
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Ab conditional rendering
  if (error) {
    return (
      <div className="state state-error">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="state">
        Loading products...
      </div>
    );
  }

  return (
    <main className="container">
      <div className="page-header">
        <div>
          <h1>Products</h1>

          <p>
            Manage your products easily
          </p>
        </div>

        <Link
          to="/add-product"
          className="btn btn-primary"
        >
          + Add Product
        </Link>
      </div>

      <div className="filters">
        <input
          className="input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <input
          className="input"
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="select"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>
        </select>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="state">
          No products found
        </div>
      ) : (
        <div className="product-grid">
          {paginatedProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="btn btn-secondary"
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
          >
            Previous
          </button>

          <span className="page-number">
            Page {currentPage} of{" "}
            {totalPages}
          </span>

          <button
            className="btn btn-secondary"
            disabled={
              currentPage === totalPages
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}

export default Products;