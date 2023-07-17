import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { UserProvider } from "./Context/StateProvider.tsx";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
// import {useStore}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <UserProvider>
          <Notifications position="top-right" zIndex={2077} />
          <App />
        </UserProvider>
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
