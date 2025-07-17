import { createContext, useContext, useState } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import AuthTemplate from "./AuthTemplate";
import Login from "./pages/Login";

import Template from "./Template";
import Home from "./pages/Home";
import Returns from "./pages/Returns";
import Students from "./pages/Students";
import Cart from "./pages/Cart";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthTemplate />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/returns",
        element: <Returns />,
      },
      {
        path: "/students",
        element: <Students />,
      },
      {
        path: "/cart",
        element: <Cart />,
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
    secondary: {
      main: "#8C8179",
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
