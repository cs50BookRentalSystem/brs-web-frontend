import { AppBar, IconButton, Toolbar, Box, Typography } from "@mui/material";

import {
  AccountCircle as AccountIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";

import { useApp } from "../App";

export default function Header() {
  const { showCart } = useApp();
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box />
        <Box>
          {showCart && (
            <IconButton color="inherit" onClick={() => {}}>
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
