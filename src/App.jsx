import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/customer/Home";
import Collection from "./components/Collection";
import WesternCollection from "./components/westren";
import CategoryPage from "./components/CategoryPage";
import ProductDetail from "./components/ProductDetail";
import Customer from "./components/Customer";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Cards /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/western" element={<WesternCollection />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/customer" element={<div style={{paddingTop: "90px"}}><Customer /></div>} />
        <Route path="/shop" element={<h1 style={{padding: "120px 20px", textAlign: "center"}}>Shop Page - Coming Soon!</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
