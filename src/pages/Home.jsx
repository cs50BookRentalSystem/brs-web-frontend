import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Box,
  Button,
  IconButton,
  Pagination,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import Sad from "../components/Sad";

const api = import.meta.env.VITE_API;
const LIMIT = 10;

export default function Home() {
  const [openForm, setOpenForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;
  const { isLoading, isError, error, data, refetch } = useQuery({
    queryKey: ["books", page],
    queryFn: async () => {
      const queryParam = searchKey.trim() ? `query=${searchKey}` : "";
      const res = await fetch(
        `${api}/books?${queryParam}&limit=${LIMIT}&offset=${offset}`,
        {
          credentials: "include",
        }
      );
      return res.json();
    },
  });

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

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
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add New Book
        </Button>
      </Box>

      <BookForm open={openForm} setOpen={setOpenForm} />

      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          refetch();
        }}
        sx={{ display: "flex", mt: 3, mb: 3 }}
      >
        <TextField
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          variant="outlined"
          label="Search by Book Name"
          size="small"
          fullWidth
        />
        <IconButton type="submit">
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {data.results.length == 0 ? (
        <>
          <Sad msg={"No books found..."} />
        </>
      ) : (
        <>
          {data.results.map((book) => {
            return <BookCard key={book.id} book={book} />;
          })}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Pagination
              count={Math.ceil(data.pagination.total / 10)}
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
            />
          </Box>
        </>
      )}
    </>
  );
}
