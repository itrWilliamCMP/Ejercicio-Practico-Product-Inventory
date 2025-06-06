import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import NotFound from "./pages/PageNotFound";
import {Toaster} from "react-hot-toast";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Products/:id?" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster
        position="top-right"
        toastOptions={{
          className: "bg-gray-800 text-white",
          duration: 3000,
          style: {
            fontSize: "16px",
          },
        }}
      />
      </Router>
    </>
  );
}

export default App;
