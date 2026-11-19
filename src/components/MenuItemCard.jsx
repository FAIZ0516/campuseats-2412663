import { Link, useLocation } from "react-router";

function MenuItemCard({ item, onAdd, isFavourite, onToggleFavourite }) {
  const location = useLocation();

  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">
        {item.name.charAt(0)}
      </div>

      <p className="tag">{item.category}</p>
      <h3>{item.name}</h3>
      <p className="muted">{item.description}</p>
      <p className="price">RM {item.price.toFixed(2)}</p>

      <button
        type="button"
        className="btn"
        disabled={!item.available}
        onClick={() => onAdd(item)}
      >
        {item.available ? "Add to cart" : "Sold out"}
      </button>

      {onToggleFavourite ? (
        <button
          type="button"
          className="btn btn-outline"
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(item.id)}
        >
          {isFavourite ? "★ Favourite" : "☆ Add to favourites"}
        </button>
      ) : (
        <p className="muted">
          <Link to="/login" state={{ from: location.pathname }}>
            Log in to save favourites
          </Link>
        </p>
      )}
    </article>
  );
}

export default MenuItemCard;
