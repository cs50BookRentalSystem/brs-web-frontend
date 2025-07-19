import { Outlet } from "react-router-dom";

import { Box, Container } from "@mui/material";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function Template() {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Container sx={{ ml: 30, pt: 5, pb: 5 }}>
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
