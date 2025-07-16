import { AppBar, IconButton, Toolbar, Box, Typography } from "@mui/material";

import {
  AccountCircle as AccountIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";

import { useApp } from "../App";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { showCart } = useApp();
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box />
        <Box>
          {showCart && (
            <IconButton color="inherit" onClick={() => navigate("/cart")}>
              <CartIcon />
            </IconButton>
          )}
          <IconButton color="inherit" edge="end" onClick={() => {}}>
            <AccountIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
