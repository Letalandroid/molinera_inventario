import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import ProductList from "./pages/ProductList";

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/products" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
}
