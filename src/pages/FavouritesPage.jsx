import { Link } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useVendor } from "../hooks/useVendor.js";
import { useFavourites } from "../hooks/useFavourites.js";

function FavouritesPage() {
  const { vendors, loading, error, reload } = useVendors();
  const {
    favouriteIds,
    loading: favouritesLoading,
    error: favouritesError,
  } = useFavourites();

  if (loading || favouritesLoading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  const errorLine = favouritesError && (
    <p className="field-error" role="alert">
      {favouritesError}
    </p>
  );

  if (favouriteIds.length === 0) {
    return (
      <>
        <h2 className="section-title">My favourites</h2>
        {errorLine}
        <p className="muted">
          No favourites yet. Open a <Link to="/">vendor</Link> and tap
          &ldquo;Add to favourites&rdquo; on an item.
        </p>
      </>
    );
  }

  return (
    <>
      <h2 className="section-title">My favourites</h2>
      {errorLine}
      {vendors.map((vendor) => (
        <FavouriteGroup
          key={vendor.id}
          vendor={vendor}
          favouriteIds={favouriteIds}
        />
      ))}
    </>
  );
}

// One vendor's favourite items. Menus are a subcollection now (not inside
// the vendor any more), so each group reads its own vendor's menu.
function FavouriteGroup({ vendor, favouriteIds }) {
  const { menu } = useVendor(vendor.id);
  const items = menu
    .filter((item) => favouriteIds.includes(item.id))
    .map((item) => ({ ...item, vendorName: vendor.name }));

  if (items.length === 0) return null; // nothing saved from this vendor

  return (
    <section>
      <h3 className="section-title">
        <Link to={`/vendor/${vendor.id}`}>{vendor.name}</Link>
      </h3>
      <MenuList items={items} />
    </section>
  );
}

export default FavouritesPage;
