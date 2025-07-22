import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Box, Typography, Button } from "@mui/material";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { queryClient } from "../App";

const api = import.meta.env.VITE_API;
const LIMIT = 10;

export default function Students() {
  const [openForm, setOpenForm] = useState();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  // get the list of students
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch(`${api}/students`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to create new student...");
      return res.json();
    },
  });

  // add new student
  const addFn = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${api}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create new student...");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      setOpenForm(false);
    },
  });

  // todo: api integration for deleting student
  const deleteFn = () => {};

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
          Students
        </Typography>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add New Student
        </Button>
      </Box>

      <StudentForm open={openForm} setOpen={setOpenForm} addFn={addFn.mutate} />

      <StudentTable
        rows={data.results}
        paginationModel={paginationModel}
        setPaginationModel={setPaginationModel}
      />
    </>
  );
}
