import { Outlet } from "react-router-dom";

import { Box, Container, Snackbar, SnackbarContent } from "@mui/material";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import { useApp } from "./App";

export default function Template() {
  const { globalMsg, setGlobalMsg, globalErrMsg, setGlobalErrMsg } = useApp();
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Container sx={{ ml: 30, pt: 5, pb: 5 }}>
          <Outlet />
        </Container>
        <Snackbar
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          open={Boolean(globalMsg)}
          autoHideDuration={6000}
          onClose={() => setGlobalMsg(null)}
          message={globalMsg}
        />
        <Snackbar
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
          open={Boolean(globalErrMsg)}
          autoHideDuration={6000}
          onClose={() => setGlobalErrMsg(null)}
        >
          <SnackbarContent
            message={globalErrMsg}
            sx={{
              backgroundColor: "#d32f2f",
              color: "white",
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 1,
            }}
          />
        </Snackbar>
      </Box>
    </>
  );
}
