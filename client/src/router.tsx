import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import Register from "./auth/Register";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}
