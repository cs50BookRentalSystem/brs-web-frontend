import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  Paper,
  Table,
  TableRow,
  TableBody,
  TablePagination,
  Alert,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";
import dayjs from "dayjs";

const api = import.meta.env.VITE_API;
const LIMIT = 10;

export default function Overdues() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { isError, isLoading, error, data, refetch } = useQuery({
    queryKey: ["overdues", page],
    queryFn: async () => {
      const res = await fetch(
        `${api}/overdues?limit=${LIMIT}&offset=${offset}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch data...");
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
          Overdues
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell># Books</TableCell>
                  <TableCell>Date Rented</TableCell>
                  <TableCell>Days Overdue</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      placeholder="Search by Student Name"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((row) => (
                  <TableRow key={row.rent_id}>
                    <TableCell>{row.student_name}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.total_books}</TableCell>
                    <TableCell>
                      {dayjs(row.rented_date).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell>{row.days_overdue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component={"div"}
            count={data.pagination.total}
            page={page - 1}
            onPageChange={(e, newPage) => {
              setPage(newPage + 1);
            }}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
          />
        </Paper>
      </Box>
    </>
  );
}
