import { useLocalStorage } from "../hooks/useLocalStorage.js";
import { useAuth } from "../hooks/useAuth.js";
import { FavouritesContext } from "./favourites-context.js";

function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? "ce-favs-" + user.uid : null;
  const [favouriteIds, setFavouriteIds] = useLocalStorage(storageKey, []);

  function toggleFavourite(itemId) {
    if (!user) return; // guests can't save favourites
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
