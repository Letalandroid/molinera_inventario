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
import AdminRoute from "./components/AdminRoutes";
import MovementList from "./pages/MovementList";
import AuditList from "./pages/AuditList";
import ReportsList from "./pages/ReportsList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={
            <PrivateRoutes>
              <Register />
            </PrivateRoutes>
          }
        />

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
            <AdminRoute>
              <ProvidersList />
            </AdminRoute>
          }
        />

        <Route
          path="/movimientos"
          element={
            <AdminRoute>
              <MovementList />
            </AdminRoute>
          }
        />

        <Route
          path="/auditorias"
          element={
            <AdminRoute>
              <AuditList />
            </AdminRoute>
          }
        />

        <Route
          path="/reportes"
          element={
            <AdminRoute>
              <ReportsList />
            </AdminRoute>
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
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <AdminRoute>
              <UserProfile />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
