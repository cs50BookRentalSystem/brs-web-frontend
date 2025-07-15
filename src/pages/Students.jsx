import { useState } from "react";

import { Box, Typography, Button } from "@mui/material";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

export default function Students() {
  const [open, setOpen] = useState();
  const rows = [
    { id: 1, name: "Elon Musk", card_id: "HVD001" },
    { id: 2, name: "Mark Zukerberg", card_id: "HVD002" },
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
          Students
        </Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add New Student
        </Button>
      </Box>

      <StudentForm open={open} setOpen={setOpen} />

      <StudentTable rows={rows} />
    </>
  );
}
