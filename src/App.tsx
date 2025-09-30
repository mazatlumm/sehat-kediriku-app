import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react"; // Impor Box
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Pregnancy from "./pages/Pregnancy";
import Baby from "./pages/Baby";
import Nutritions from "./pages/Nutritions";
import Maps from "./pages/Maps";
import BottomNav from "./components/BottomNav";
import BabyAndPregnancy from "./pages/BabyAndPregnancy";
import Parents from "./pages/Parents";
import SkinDetector from "./pages/SkinDetector";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-R387M3VHVW", {
        page_path: location.pathname,
      });
    }
  }, [location]);
}

export default function App() {
  usePageTracking();
  return (
    <Box pb="70px">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/baby-and-pregnancy" element={<BabyAndPregnancy />} />
        <Route path="/nutritions" element={<Nutritions />} />
        <Route path="/parents" element={<Parents />} />
        <Route path="/skin-detection" element={<SkinDetector />} />
      </Routes>
      <BottomNav />
    </Box>
  );
}