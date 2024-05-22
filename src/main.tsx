import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource/lobster";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainContent from "./components/MainContent.tsx";
import Transaction from "./pages/Transaction.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainContent />,
      },
      {
        path: "/transaction",
        element: <Transaction />,
      },
      {
        path: "/report",
        /* element: <Transaction />, */
      },
      {
        path: "/setting",
        /* element: <Transaction />, */
      },
      {
        path: "/profile",
        /* element: <Transaction />, */
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
