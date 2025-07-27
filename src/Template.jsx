import { Outlet } from "react-router-dom";

import { Box, Container, Snackbar } from "@mui/material";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ErrSnackBar from "./components/ErrSnackBar";

import { useApp } from "./App";

export default function Template() {
  const { globalMsg, setGlobalMsg } = useApp();
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
        <ErrSnackBar />
      </Box>
    </>
  );
}
