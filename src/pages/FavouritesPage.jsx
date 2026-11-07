import { Link } from "react-router";
import MenuList from "../components/MenuList.jsx";
import { Loading, ErrorMessage } from "../components/Status.jsx";
import { useVendors } from "../hooks/useVendors.js";
import { useFavourites } from "../hooks/useFavourites.js";

// Personal feature (digit 3), Week 4 step: a page that lists every
// favourite item, grouped under the vendor it comes from.
function FavouritesPage() {
  const { vendors, loading, error, reload } = useVendors();
  const { favouriteIds } = useFavourites();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  // only the ids are saved, so look the items up in the vendor data
  const groups = vendors
    .map((vendor) => ({
      vendor,
      items: vendor.menu.filter((item) => favouriteIds.includes(item.id)),
    }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) {
    return (
      <>
        <h2 className="section-title">My favourites</h2>
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
      {groups.map(({ vendor, items }) => (
        <section key={vendor.id}>
          <h3 className="section-title">
            <Link to={`/vendor/${vendor.id}`}>{vendor.name}</Link>
          </h3>
          <MenuList items={items} />
        </section>
      ))}
    </>
  );
}

export default FavouritesPage;
