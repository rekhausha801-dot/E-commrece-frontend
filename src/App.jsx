import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/customer/Home";
 
export default function App() {
  return (
    <BrowserRouter>
      {/* <Cards /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<h1 style={{padding: "120px 20px", textAlign: "center"}}>Shop Page - Coming Soon!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
