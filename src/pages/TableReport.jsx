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

export default function TableReport() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const { isError, isLoading, error, data, refetch } = useQuery({
    queryKey: ["rents", page],
    queryFn: async () => {
      const res = await fetch(`${api}/rents?limit=${LIMIT}&offset=${offset}`, {
        credentials: "include",
      });
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
          Books Currently Rented
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book Name</TableCell>
                  <TableCell>Student Name</TableCell>
                  <TableCell>Date Rented</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      placeholder="Search by Book Name"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      placeholder="Search by Student Name"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="date"
                      variant="outlined"
                      placeholder="Search by Date Rented"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.results.map((row) => (
                  <TableRow key={row.rent_id}>
                    <TableCell>{row.book_title}</TableCell>
                    <TableCell>{row.student_name}</TableCell>
                    <TableCell>
                      {dayjs(row.rented_date).format("YYYY-MM-DD")}
                    </TableCell>
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
