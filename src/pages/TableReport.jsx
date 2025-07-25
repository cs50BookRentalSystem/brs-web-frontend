import { Box, TextField, Typography } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";

export default function TableReport() {
  const [filters, setFilters] = useState({
    book: "",
    student: "",
  });
  const columns = [
    {
      field: "book",
      headerName: "Book Name",
      flex: 1,
      renderHeader: () => {
        <TextField size="small" placeholder="Search by Book" />;
      },
    },
    { field: "student", headerName: "Student Name", flex: 1 },
    { field: "date", headerName: "Date Rented", flex: 1 },
  ];

  const rows = [
    { id: 1, book: "Harry Potter", student: "Elon Musk", date: "2025-01-01" },
    { id: 2, book: "Harry Potter", student: "Elon Musk", date: "2025-01-01" },
    { id: 3, book: "Harry Potter", student: "Elon Musk", date: "2025-01-01" },
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
          Books Currently Rented
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={10}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
        />
      </Box>
    </>
  );
}
