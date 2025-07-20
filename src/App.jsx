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

export const AppContext = createContext();

export const queryClient = new QueryClient();

export function useApp() {
  return useContext(AppContext);
}

const requireAuth = async () => {
  const api = "http://localhost:8080";
  const res = await fetch(`${api}/students?limit=20&offset=0`, {
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
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
