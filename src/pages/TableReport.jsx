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

import { useEffect, useState } from "react";
import dayjs from "dayjs";

const api = import.meta.env.VITE_API;
const LIMIT = 10;

export default function TableReport() {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;
  const [filters, setFilters] = useState({
    book_name: "",
    student_name: "",
    date: "",
  });
  const [trigger, setTrigger] = useState(0);

  const { isError, isLoading, error, data, refetch } = useQuery({
    queryKey: ["rents", page, trigger],
    queryFn: async () => {
      const query = new URLSearchParams();
      Object.entries(filters).forEach(([key, val]) => {
        if (val?.trim()) {
          query.append(key, val.trim());
        }
      });
      console.log(query);
      const res = await fetch(
        `${api}/rents?limit=${LIMIT}&offset=${offset}&${query.toString()}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch data...");
      return res.json();
    },
  });

  useEffect(() => {
    if (filters.date) {
      refetch();
    }
  }, [filters.date]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setTrigger((prev) => prev + 1);
    }
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
                      value={filters.book_name}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, book_name: e.target.value }))
                      }
                      onKeyDown={handleKeyDown}
                      variant="outlined"
                      placeholder="Search by Book Name"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={filters.student_name}
                      onChange={(e) =>
                        setFilters((f) => ({
                          ...f,
                          student_name: e.target.value,
                        }))
                      }
                      onKeyDown={handleKeyDown}
                      variant="outlined"
                      placeholder="Search by Student Name"
                      size="small"
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={filters.date}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, date: e.target.value }))
                      }
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
