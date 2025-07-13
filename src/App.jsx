import { createContext, useContext, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import Template from "./Template";
import Home from "./pages/Home";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#A51C30",
    },
    text: { fade: grey[500] },
  },
});

export default function App() {
  const [showCart, setShowCart] = useState(true);
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showCart,
          setShowCart,
        }}
      >
        <RouterProvider router={router} />
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
