import { createContext, useContext, useState } from "react";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

import AuthTemplate from "./AuthTemplate";
import Login from "./pages/Login";

import Template from "./Template";
import Home from "./pages/Home";
import Returns from "./pages/Returns";
import Students from "./pages/Students";
import Cart from "./pages/Cart";
import Report from "./pages/Report";
import TableReport from "./pages/TableReport";

export const AppContext = createContext();

export const queryClient = new QueryClient();

export function useApp() {
  return useContext(AppContext);
}

const requireAuth = async () => {
  const api = import.meta.env.VITE_API;
  const res = await fetch(`${api}/librarian`, {
    credentials: "include",
  });
  if (!res.ok) throw redirect("/login");
};

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
    loader: requireAuth,
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
      {
        path: "/report",
        element: <Report />,
      },
      {
        path: "/table-report",
        element: <TableReport />,
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
  const [globalMsg, setGlobalMsg] = useState(null);
  const [globalErrMsg, setGlobalErrMsg] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            globalMsg,
            setGlobalMsg,
            globalErrMsg,
            setGlobalErrMsg,
            cartItems,
            setCartItems,
          }}
        >
          <CssBaseline />
          <RouterProvider router={router} />
        </AppContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
