import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": { // Perbaikan: Menargetkan elemen html dan body
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);