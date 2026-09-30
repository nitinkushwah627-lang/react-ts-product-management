import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

function ProductCard({
  id,
  name,
  price,
  image,
  onDelete,
  onEdit,
}: ProductCardProps) {
  return (
    <div className="product-card">
      <img
        src={image || "https://dummyjson.com/image/150"}
        alt={name}
        className="product-image"
      />

      <h3>{name}</h3>

      <p className="product-price">
        ₹{price}
      </p>

      <div className="card-actions">
        <button
          className="btn btn-secondary"
          onClick={() => onEdit(id)}
        >
          Edit
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(id)}
        >
          Delete
        </button>

        <Link
          className="btn btn-primary"
          to={`/products/${id}`}
        >
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;