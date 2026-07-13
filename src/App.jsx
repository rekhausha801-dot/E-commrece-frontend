import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./components/Cards";
import Collection from "./components/Collection";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Cards /> */}
      <Collection />
    </BrowserRouter>
  );
}
