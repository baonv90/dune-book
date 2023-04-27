import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home.tsx";
import ReadingView from "./components/reading.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<ReadingView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
