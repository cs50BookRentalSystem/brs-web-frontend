import { Box, Typography, TextField, IconButton, Alert } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";

import ReturnCard from "../components/ReturnCard";
import Sad from "../components/Sad";

import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";

const api = import.meta.env.VITE_API;

export default function Returns() {
  const cardRef = useRef();
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: async (cardId) => {
      const res = await fetch(`${api}/returns?student_card_id=${cardId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch data...");
      return res.json();
    },
  });

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

      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          mutate(cardRef.current.value.trim());
        }}
        sx={{ display: "flex", mt: 3, mb: 3 }}
      >
        <TextField
          variant="outlined"
          label="Search by Student Card ID"
          inputRef={cardRef}
          size="small"
          required
          fullWidth
        />
        <IconButton type="submit">
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {isError && (
        <Box>
          <Alert severity="warning">{error.message}</Alert>
        </Box>
      )}

      {isPending && <Box sx={{ textAlign: "center" }}>Loading...</Box>}

      {isSuccess &&
        (data.results.length === 0 ? (
          <>
            <Sad msg={"No data found..."} />
          </>
        ) : (
          <ReturnCard student={data.results} cardId={cardRef.current.value} />
        ))}
    </>
  );
}
