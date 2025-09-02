import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log("🔄 Ada update baru! Refresh untuk mendapatkan versi terbaru.");
  },
  onOfflineReady() {
    console.log("✅ Aplikasi siap digunakan offline.");
  },
});

// Chakra UI Theme
const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg: mode("white", "gray.900")(props),
        color: mode("gray.800", "whiteAlpha.900")(props),
      },
    }),
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

// Render App
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
