import { useState } from "react";
import { Link, useParams } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useFavourites } from "../hooks/useFavourites.js";

function VendorPage() {
  const { id } = useParams(); // /vendor/2412663-faiz-cafe -> id = '2412663-faiz-cafe'
  const { vendors, loading, error, reload } = useVendors();
  const { favouriteIds } = useFavourites();
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">There is no vendor with the id "{id}".</p>
        <Link to="/">Back to all vendors</Link>
      </div>
    );
  }

  const visibleItems = favouritesOnly
    ? vendor.menu.filter((item) => favouriteIds.includes(item.id))
    : vendor.menu;

  return (
    <section>
      <p>
        <Link to="/">&larr; All vendors</Link>
      </p>

      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">
        {vendor.location} &middot; {vendor.openHours}
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            checked={favouritesOnly}
            onChange={(event) => setFavouritesOnly(event.target.checked)}
          />
          Favourites only
        </label>
      </p>

      <MenuList items={visibleItems} />
    </section>
  );
}

export default VendorPage;
