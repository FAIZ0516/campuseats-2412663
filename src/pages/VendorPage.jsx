import { useState } from "react";
import { Link, useParams } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendor } from "../hooks/useVendor.js";
import { useFavourites } from "../hooks/useFavourites.js";
import { useAuth } from "../hooks/useAuth.js";

function VendorPage() {
  const { id } = useParams(); // /vendor/2412663-faiz-cafe -> id = '2412663-faiz-cafe'
  const { vendor, menu, loading, error } = useVendor(id);
  const { favouriteIds, error: favouritesError } = useFavourites();
  const { user } = useAuth();
  const [favouritesOnly, setFavouritesOnly] = useState(false);

  if (loading) return <Loading />;
  if (error) {
    return (
      <ErrorMessage message={error} onRetry={() => window.location.reload()} />
    );
  }

  if (!vendor) {
    return (
      <div className="card">
        <h2>Vendor not found</h2>
        <p className="muted">There is no vendor with the id "{id}".</p>
        <Link to="/">Back to all vendors</Link>
      </div>
    );
  }

  // Each cart line must know its vendor, so orders can be split per vendor.
  const items = menu.map((item) => ({ ...item, vendorName: vendor.name }));

  // guests have no favourites, so the filter only applies when signed in
  const showFavouritesOnly = user && favouritesOnly;
  const visibleItems = showFavouritesOnly
    ? items.filter((item) => favouriteIds.includes(item.id))
    : items;

  return (
    <section>
      <p>
        <Link to="/">&larr; All vendors</Link>
      </p>

      <h2 className="section-title">Menu: {vendor.name}</h2>
      <p className="muted">
        {vendor.location} &middot; {vendor.openHours}
      </p>

      {user && (
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
      )}

      {favouritesError && (
        <p className="field-error" role="alert">
          {favouritesError}
        </p>
      )}

      <MenuList items={visibleItems} />
    </section>
  );
}

export default VendorPage;
