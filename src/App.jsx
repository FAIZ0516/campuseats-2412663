import { BrowserRouter, Routes, Route } from "react-router";
import CartProvider from "./context/CartProvider.jsx";
import FavouritesProvider from "./context/FavouritesProvider.jsx";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import VendorPage from "./pages/VendorPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavouritesProvider>
          <Routes>
            {/* Layout has no path: it just wraps every page below it */}
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="vendor/:id" element={<VendorPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </FavouritesProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
