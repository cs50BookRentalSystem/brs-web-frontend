import {
  Box,
  Button,
  IconButton,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import Book from "../components/Book";

export default function Home() {
  const bookData = [
    { id: 1, title: "Harry Potter 1", stock: 2 },
    { id: 2, title: "Harry Potter 2", stock: 1 },
    { id: 3, title: "Harry Potter 3", stock: 1 },
  ];
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
          Home
        </Typography>
        <Button variant="contained">Add New Book</Button>
      </Box>

      <Box sx={{ display: "flex", mt: 3, mb: 3 }}>
        <TextField variant="outlined" label="Search" size="small" fullWidth />
        <IconButton>
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {bookData.map((book) => {
        return <Book book={book} />;
      })}

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          mt: 3,
        }}
      >
        <Pagination count={10} />
      </Box>
    </>
  );
}
