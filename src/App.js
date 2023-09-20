import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import AdminPanel from "./pages/admin/AdminPanel";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import AdminOrders from "./pages/admin/AdminOrders";
import SaveProduct from "./pages/admin/SaveProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SaveCustomer from "./pages/admin/SaveUser";
import UpdateCustomer from "./pages/admin/UpdateUser";

function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn ? (
          <Routes>
            {isAdmin ? (
              <>
                <Route exact path="/admin-panel" element={<AdminPanel />} />
                <Route
                  exact
                  path="/"
                  element={<Navigate to="/admin-panel" />}
                />
                <Route
                  exact
                  path="/ana-sayfa"
                  element={<Navigate to="/admin-panel" />}
                />
                <Route
                  exact
                  path="/giris-yap"
                  element={<Navigate to="/admin-panel" />}
                />
                <Route exact path="/musteriler" element={<Users />} />
                <Route exact path="/urunler" element={<Products />} />
                <Route exact path="/urun-ekle" element={<SaveProduct />} />
                <Route
                  exact
                  path="/urun-guncelle/*"
                  element={<UpdateProduct />}
                />
                <Route exact path="/musteri-ekle" element={<SaveCustomer />} />
                <Route
                  exact
                  path="/musteri-guncelle/*"
                  element={<UpdateCustomer />}
                />
                <Route exact path="/siparisler" element={<AdminOrders />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Navigate to="/ana-sayfa" />} />
                <Route exact path="/ana-sayfa" element={<Home />} />
                <Route
                  exact
                  path="/giris-yap"
                  element={<Navigate to="/ana-sayfa" />}
                />
                <Route exact path="/sepet" element={<Orders />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/giris-yap" element={<Login />} />
            <Route path="*" element={<Navigate to="/giris-yap" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
