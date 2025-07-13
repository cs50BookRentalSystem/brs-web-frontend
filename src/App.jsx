import { createContext, useContext, useState } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Box, Toolbar } from "@mui/material";
import { grey } from "@mui/material/colors";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Book from "./components/Book";

export const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

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
  const bookData = [
    { id: 1, title: "Harry Potter 1", stock: 2 },
    { id: 2, title: "Harry Potter 2", stock: 1 },
    { id: 3, title: "Harry Potter 3", stock: 1 },
  ];
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showCart,
          setShowCart,
        }}
      >
        <Header />
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 1, ml: 30 }}>
            {bookData.map((book) => {
              return <Book book={book} />;
            })}
          </Box>
        </Box>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
