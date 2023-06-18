import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "./Context/StateProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <ChakraProvider> */}
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <App />
      </UserProvider>
    </MantineProvider>
    {/* </ChakraProvider> */}
  </React.StrictMode>
);
