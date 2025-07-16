import { Paper, TextField, Typography, Box, IconButton } from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

export default function CartStudentForm({ found, student }) {
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3, width: "60%" }}>
      <Typography variant="h6">Student Information Form</Typography>
      <Box sx={{ display: "flex", mt: 1.5 }}>
        <TextField
          variant="outlined"
          label="Student Card ID"
          size="small"
          fullWidth
        />
        <IconButton>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {found && (
        <Box sx={{ display: "flex", flexDirection: "column", mt: 3, ml: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: 150, fontWeight: 500 }}>
              Student Name:
            </Typography>
            <Typography>{student.name}</Typography>
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography sx={{ width: 150, fontWeight: 500 }}>Major:</Typography>
            <Typography>{student.major}</Typography>
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <Typography sx={{ width: 150, fontWeight: 500 }}>Phone:</Typography>
            <Typography>{student.phone}</Typography>
          </Box>
        </Box>
      )}
      {!found && (
        <Typography color="error" sx={{ ml: 1, mt: 1 }}>
          No information found
        </Typography>
      )}
    </Paper>
  );
}
