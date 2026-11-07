import { useContext } from "react";
import { FavouritesContext } from "../context/favourites-context.js";

export function useFavourites() {
  const context = useContext(FavouritesContext);

  if (context === null) {
    throw new Error("useFavourites() must be used inside <FavouritesProvider>");
  }

  return context;
}
