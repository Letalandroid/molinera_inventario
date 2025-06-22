import { Routes, Route, BrowserRouter } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoutes";
import ProductList from "./pages/ProductList";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ProductForm from "./pages/ProductForm";
import UserList from "./pages/UserList";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/productos"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />

        <Route
          path="/products/create"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <PrivateRoute>
              <ProductForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
