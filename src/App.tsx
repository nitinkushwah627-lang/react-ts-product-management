import { useContext } from "react";

import {
  Navigate,
  NavLink,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import ProductContext from "./context/ProductContext";

import Products from "./pages/Products";
import ProductForm from "./components/ProductForm";
import ProductDetails from "./pages/ProductDetails";
import ProductInfo from "./pages/ProductInfo";
import ProductReviews from "./pages/ProductReviews";

function App() {
  const context =
    useContext(ProductContext);

  if (!context) {
    return null;
  }

  const {
    editingProduct,
    editProduct,
    cancelEdit,
    deleteProduct,
  } = context;

  return (
    <div className="app">
      <nav className="navbar">
        <Link
          to="/products"
          className="navbar-logo"
        >
          Product Manager
        </Link>

        <div className="navbar-links">
          <NavLink to="/products">
            Products
          </NavLink>

          <NavLink to="/add-product">
            Add Product
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route
          path="/products"
          element={
            <Products
              onEdit={editProduct}
              onDelete={deleteProduct}
            />
          }
        />

        <Route
          path="/add-product"
          element={
            <ProductForm
              editingProduct={
                editingProduct
              }
              onCancelEdit={
                cancelEdit
              }
            />
          }
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        >
          <Route
            path="details"
            element={
              <ProductInfo />
            }
          />

          <Route
            path="reviews"
            element={
              <ProductReviews />
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <Navigate
              to="/products"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <div className="not-found">
              <h1>404</h1>

              <p>
                The page you are looking
                for does not exist.
              </p>

              <Link
                to="/products"
                className="btn btn-primary"
              >
                Back to Products
              </Link>
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;