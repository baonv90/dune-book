import React from "react";
import { AppearanceProvider } from "./providers/appearance-provider.tsx";
import ApplicationProvider from "./providers/application-provider.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home.tsx";
import ReadingView from "./components/reading.tsx";

function App() {
  return (
    <AppearanceProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<ReadingView />} />
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </AppearanceProvider>
  );
}

export default App;
