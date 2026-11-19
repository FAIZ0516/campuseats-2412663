import MenuItemCard from "./MenuItemCard.jsx";
import { useCart } from "../hooks/useCart.js";
import { useFavourites } from "../hooks/useFavourites.js";
import { useAuth } from "../hooks/useAuth.js";

function MenuList({ items }) {
  const { addToCart } = useCart();
  const { favouriteIds, toggleFavourite } = useFavourites();
  const { user } = useAuth();

  if (items.length === 0) {
    return <p className="muted">No items to show.</p>;
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={addToCart}
          isFavourite={favouriteIds.includes(item.id)}
          // guests get no toggle, so the card shows a log in link instead
          onToggleFavourite={user ? toggleFavourite : null}
        />
      ))}
    </div>
  );
}

export default MenuList;
