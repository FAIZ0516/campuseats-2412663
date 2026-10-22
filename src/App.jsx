import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import VendorCard from './components/VendorCard.jsx'
import MenuList from './components/MenuList.jsx'
import CartPage from './components/CartPage.jsx'
import { Loading, ErrorMessage } from './components/Status.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedVendorId, setSelectedVendorId] = useState(null)
  const [cart, setCart] = useState([])
  const [view, setView] = useState('menu')
  const [lastOrder, setLastOrder] = useState(null)

  const [favouriteIds, setFavouriteIds] = useState([])
  const [favouritesOnly, setFavouritesOnly] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        setSelectedVendorId(data[0]?.id ?? null)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  const selectedVendor = vendors.find(
    (vendor) => vendor.id === selectedVendorId
  )

  const visibleItems = selectedVendor
    ? selectedVendor.menu.filter(
        (item) => !favouritesOnly || favouriteIds.includes(item.id)
      )
    : []

  const cartCount = cart.reduce(
    (total, line) => total + line.qty,
    0
  )

  function handleRetry() {
    setError(null)
    setLoading(true)
    setReloadKey((key) => key + 1)
  }

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (line) => line.item.id === item.id
      )

      if (existing) {
        return prevCart.map((line) =>
          line.item.id === item.id
            ? { ...line, qty: line.qty + 1 }
            : line
        )
      }

      return [...prevCart, { item, qty: 1 }]
    })
  }

  function handleChangeQty(itemId, delta) {
    setCart((prevCart) =>
      prevCart
        .map((line) =>
          line.item.id === itemId
            ? { ...line, qty: line.qty + delta }
            : line
        )
        .filter((line) => line.qty > 0)
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) =>
      prevCart.filter((line) => line.item.id !== itemId)
    )
  }

  function handlePlaceOrder(details) {
    const total = cart.reduce(
      (sum, line) => sum + line.item.price * line.qty,
      0
    )

    setLastOrder({ ...details, total })
    setCart([])
    setView('done')
  }

  function handleToggleFavourite(itemId) {
    setFavouriteIds((previousIds) =>
      previousIds.includes(itemId)
        ? previousIds.filter((id) => id !== itemId)
        : [...previousIds, itemId]
    )
  }

  let content

  if (view === 'cart') {
    content = (
      <CartPage
        cart={cart}
        onChangeQty={handleChangeQty}
        onRemove={handleRemove}
        onPlaceOrder={handlePlaceOrder}
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed.</h2>
        <p>Thank you for your order, {lastOrder.name}!</p>
        <p>Mahallah: <strong>{lastOrder.mahallah}</strong></p>
        <p>Pickup time: <strong>{lastOrder.pickupTime}</strong></p>
        <p>Total price: <strong>RM {lastOrder.total.toFixed(2)}</strong></p>
        <button type="button" className="btn" onClick={() => setView('menu')}>
          Back to menu
        </button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = (
      <ErrorMessage message={error} onRetry={handleRetry} />
    )
  } else if (!selectedVendor) {
    content = <p className="muted">No vendors available.</p>
  } else {
    content = (
      <>
        <section>
          <h2 className="section-title">Choose a vendor</h2>
          <div className="vendor-grid">
            {vendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                isSelected={vendor.id === selectedVendorId}
                onSelect={setSelectedVendorId}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">
            Menu: {selectedVendor.name}
          </h2>

          <label>
            <input
              type="checkbox"
              checked={favouritesOnly}
              onChange={(event) =>
                setFavouritesOnly(event.target.checked)
              }
            />
            Favourites only
          </label>

          <MenuList
            items={visibleItems}
            onAdd={handleAddToCart}
            favouriteIds={favouriteIds}
            onToggleFavourite={handleToggleFavourite}
          />
        </section>
      </>
    )
  }

  return (
    <>
      <Header
        cartCount={cartCount}
        onShowMenu={() => setView('menu')}
        onShowCart={() => setView('cart')}
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App
