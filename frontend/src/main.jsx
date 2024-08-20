import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "./context/ContextProvider.jsx";
import ThemeProvider from "./theme/ThemeProvider.jsx";
import RouterProvider from "./routing/RouterProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>
);
