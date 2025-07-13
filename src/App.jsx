import { createContext, useContext, useState } from "react";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

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
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showCart,
          setShowCart,
        }}
      >
        <Box>
          <Header />
          <Sidebar />
        </Box>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
