import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function StudentTable({ rows }) {
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Student Name", flex: 1 },
    { field: "card_id", headerName: "Student ID", flex: 1 },
    {
      field: "action",
      headerName: "",
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <IconButton
            onClick={() => {
              console.log(params.row.id);
            }}
            color="error"
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box sx={{ mt: 3 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        disableColumnSelector
        disableDensitySelector
      />
    </Box>
  );
}
