import MenuItemCard from "./MenuItemCard.jsx";
import { useCart } from "../hooks/useCart.js";
import { useFavourites } from "../hooks/useFavourites.js";

function MenuList({ items }) {
  const { addToCart } = useCart();
  const { favouriteIds, toggleFavourite } = useFavourites();

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
          onToggleFavourite={toggleFavourite}
        />
      ))}
    </div>
  );
}

export default MenuList;
