import { Box, Typography, Button, TextField, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import ReturnCard from "../components/ReturnCard";

export default function Returns() {
  const studentData = {
    name: "Elon Musk",
    student_id: "HVD001",
    books: ["Harry Potter 1", "Lord of the Ring", "Seven Kingdoms"],
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div">
          Returns
        </Typography>
      </Box>

      <Box sx={{ display: "flex", mt: 3, mb: 3 }}>
        <TextField
          variant="outlined"
          label="Search by Student Card ID"
          size="small"
          fullWidth
        />
        <IconButton>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      <ReturnCard student={studentData} />
    </>
  );
}
