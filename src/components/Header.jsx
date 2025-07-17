import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";

import {
  AccountCircle as AccountIcon,
  ShoppingCart as CartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useApp } from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const { showCart } = useApp();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
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
          <IconButton
            color="inherit"
            edge="end"
            onClick={(e) => {
              setAnchorEl(e.currentTarget);
            }}
          >
            <AccountIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            slotProps={{
              paper: { sx: { minWidth: 200 } },
            }}
          >
            <MenuItem
              color="inherit"
              sx={{ fontSize: "0.9em" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <LogoutIcon fontSize="small" />
                Logout
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
