import {
  AppBar,
  IconButton,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";

import {
  AccountCircle as AccountIcon,
  ShoppingCart as CartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import { useApp } from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const api = "http://localhost:8080";

export default function Header() {
  const { cartItems } = useApp();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box />
        <Box>
          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartItems.length} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>

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
              onClick={async (e) => {
                const res = await fetch(`${api}/logout`, {
                  method: "POST",
                  credentials: "include",
                });
                res.ok ? navigate("/login") : alert("Logout failed...");
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
