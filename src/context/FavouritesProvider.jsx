import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { FavouritesContext } from "./favourites-context.js";

// Personal feature (digit 3): favourites used to be state in App.
// Now they live here so every page can read them, and they survive a refresh.
function FavouritesProvider({ children }) {
  const [favouriteIds, setFavouriteIds] = useLocalStorage(
    "campuseats-favourites",
    [],
  );

  function toggleFavourite(itemId) {
    setFavouriteIds((prevIds) =>
      prevIds.includes(itemId)
        ? prevIds.filter((id) => id !== itemId)
        : [...prevIds, itemId],
    );
  }

  const value = { favouriteIds, toggleFavourite };

  return <FavouritesContext value={value}>{children}</FavouritesContext>;
}

export default FavouritesProvider;
