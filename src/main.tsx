import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "./Context/StateProvider.tsx";
import React from "react";

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
