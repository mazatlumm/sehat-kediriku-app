import React from "react";
import { Box } from "@chakra-ui/react"; // Impor Box
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Pregnancy from "./pages/Pregnancy";
import Baby from "./pages/Baby";
import Nutritions from "./pages/Nutritions";
import Maps from "./pages/Maps";
import BottomNav from "./components/BottomNav";

export default function App() {
  return (
    <Box pb="70px">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/pregnancy" element={<Pregnancy />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/nutritions" element={<Nutritions />} />
      </Routes>
      <BottomNav />
    </Box>
  );
}