import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import 'rsuite/dist/rsuite.min.css';
import App from "./App.tsx";
import { UserProvider } from "./Context/StateProvider.tsx";
import "./index.css";
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
