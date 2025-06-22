import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import ProductList from "./pages/ProductList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductForm from "./pages/ProductForm";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";
import ProvidersList from "./pages/ProvidersList";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />

        <Route
          path="/productos"
          element={
            <PrivateRoutes>
              <ProductList />
            </PrivateRoutes>
          }
        />

        <Route
          path="/proveedores"
          element={
            <PrivateRoutes>
              <ProvidersList />
            </PrivateRoutes>
          }
        />

        <Route
          path="/products/create"
          element={
            <PrivateRoutes>
              <ProductForm />
            </PrivateRoutes>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoutes>
              <ProductForm />
            </PrivateRoutes>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoutes>
              <UserList />
            </PrivateRoutes>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateRoutes>
              <UserProfile />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
