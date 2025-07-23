import { Paper, TextField, Typography, Box, IconButton } from "@mui/material";

import { Search as SearchIcon } from "@mui/icons-material";

import { useRef } from "react";

export default function CartStudentForm({ found, student, searchFn }) {
  const cardIdRef = useRef();
  return (
    <Paper variant="outlined" sx={{ mt: 3, p: 3, width: "60%" }}>
      <Typography variant="h6">Student Information Form</Typography>
      <Box
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          const cardId = cardIdRef.current.value.trim();
          searchFn(cardId);
        }}
        sx={{ display: "flex", mt: 1.5 }}
      >
        <TextField
          variant="outlined"
          label="Student Card ID"
          inputRef={cardIdRef}
          size="small"
          required
          fullWidth
        />
        <IconButton type="submit">
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </Box>
      {found && student && (
        <Box sx={{ display: "flex", flexDirection: "column", mt: 3, ml: 1 }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: 150, fontWeight: 500 }}>
              Student Name:
            </Typography>
            <Typography>
              {student.first_name + " " + student.last_name}
            </Typography>
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
      {cardIdRef.current?.value && !found && (
        <Typography color="error" sx={{ ml: 1, mt: 1 }}>
          No information found
        </Typography>
      )}
    </Paper>
  );
}
