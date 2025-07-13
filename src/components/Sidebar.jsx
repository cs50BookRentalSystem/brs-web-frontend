import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";

export default function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left">
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
          <ListItemButton>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText>Returns</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText>Students</ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText>Report</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
