import { Card, CardContent, IconButton, Typography, Box } from "@mui/material";

import { AddShoppingCart as AddIcon } from "@mui/icons-material";

export default function Book({ book }) {
  return (
    <Card sx={{ m: 1 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography fontSize="inherit">{book.title}</Typography>
          </Box>
          <Typography fontSize="inherit">{book.stock} books left</Typography>
        </Box>
        <IconButton>
          <AddIcon fontSize="inherit" />
        </IconButton>
      </CardContent>
    </Card>
  );
}
