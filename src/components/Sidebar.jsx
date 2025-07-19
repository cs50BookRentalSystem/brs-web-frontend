import { useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Drawer variant="permanent" anchor="left" sx={{ flexShrink: 0 }}>
      <Box sx={{ width: 240, position: "relative" }}>
        <Box
          component="img"
          src="/logo.png"
          sx={{
            m: 3,
            height: 48,
            width: "auto",
          }}
        />
      </Box>
      <List>
        <ListItem>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/returns")}>
            <ListItemText>Returns</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/students")}>
            <ListItemText>Students</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={() => navigate("/report")}>
            <ListItemText>Report</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
