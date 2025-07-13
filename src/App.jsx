import { createContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material";
import { deepPurple, grey } from "@mui/material/colors";

export const AppContext = createContext();

const theme = createTheme({
  palette: {
    mode: "light",
    primary: deepPurple,
    text: { fade: grey[500] },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={{}}>
        <div>
          <h1>Book Rental System</h1>
          <p>This is app...</p>
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
