import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddVideo from "./pages/AddVideo";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SingleVideo from "./pages/SingleVideo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/video/:id" element={<SingleVideo />} />
        <Route path="/video/add" element={<AddVideo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
