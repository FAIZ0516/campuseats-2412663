import MenuItemCard from './MenuItemCard.jsx'

function MenuList({ items, onAdd, favouriteIds, onToggleFavourite }) {
  if (items.length === 0) {
    return <p className="muted">No items to show.</p>
  }

  return (
    <div className="grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAdd={onAdd}
          isFavourite={favouriteIds.includes(item.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  )
}

export default MenuList