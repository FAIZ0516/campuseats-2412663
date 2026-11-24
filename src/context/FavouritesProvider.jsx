import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { FavouritesContext } from "./favourites-context.js";
import {
  subscribeToFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favourites.js";

function FavouritesProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid ?? null;
  // the ids are kept together with the uid they belong to, so after a log out
  // or a log in with another account the old list is never shown
  const [saved, setSaved] = useState({ uid: null, itemIds: [] });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!uid) return; // guests have no favourites
    const unsubscribe = subscribeToFavourites(
      uid,
      (itemIds) => setSaved({ uid, itemIds }),
      (err) => setError(err.message),
    );
    return unsubscribe;
  }, [uid]);

  const ready = uid !== null && saved.uid === uid;
  const favouriteIds = ready ? saved.itemIds : [];
  const loading = uid !== null && !ready && !error;

  // A write, so it happens in the click handler. No setSaved here: the
  // onSnapshot listener above brings the new list back by itself.
  async function toggleFavourite(itemId) {
    if (!uid) return; // guests can't save favourites
    setError("");
    try {
      if (favouriteIds.includes(itemId)) {
        await removeFavourite(uid, itemId);
      } else {
        await addFavourite(uid, itemId);
      }
    } catch (err) {
      setError(`Could not save your favourite: ${err.message}`);
    }
  }

  const value = { favouriteIds, loading, error, toggleFavourite };

  return <FavouritesContext value={value}>{children}</FavouritesContext>;
}

export default FavouritesProvider;
