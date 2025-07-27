import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

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

import { queryClient, useApp } from "../App";
import BookCard from "../components/BookCard";
import BookForm from "../components/BookForm";
import Sad from "../components/Sad";

const api = import.meta.env.VITE_API;
const LIMIT = 10;

export default function Home() {
  const { cartItems, setCartItems, setGlobalMsg, setGlobalErrMsg } = useApp();
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

  const addFn = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${api}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create book...");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      setOpenForm(false);
      setGlobalMsg("Book has been created...");
    },
  });

  const addToCart = (item) => {
    if (cartItems.length >= 3) {
      setGlobalErrMsg("Error: You can borrow only up to 3 books...");
      return;
    }
    setCartItems((prev) => [...prev, item]);
  };

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

      <BookForm open={openForm} setOpen={setOpenForm} addFn={addFn.mutate} />

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
            setSearchKey(e.target.value.trim());
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
            return <BookCard key={book.id} book={book} addToCart={addToCart} />;
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
