import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Alert,
} from "@mui/material";

import ScoreCard from "../components/ScoreCard";
import Sad from "../components/Sad";

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API;

export default function Report() {
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await fetch(`${api}/reports?limit=10`, {
        credentials: "include",
      });
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
          Report
        </Typography>
        <Button variant="contained" onClick={() => navigate("/table-report")}>
          Table Report
        </Button>
      </Box>
      <Box display={"flex"} gap="2" sx={{ mt: 3 }}>
        <ScoreCard title={"# Book Rented"} value={data.total_rents} />
        <ScoreCard title={"# Student Rentees"} value={data.total_students} />
      </Box>
      <Box sx={{ mt: 3, border: 1, borderColor: "grey.400", p: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h7">Top 10 Overdues</Typography>
          <Button
            variant="text"
            onClick={() => navigate("/overdues")}
            sx={{ textDecoration: "underline", padding: 0, minWidth: 0 }}
          >
            Full Report
          </Button>
        </Box>
        <TableContainer sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Student</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Num of Books</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Days</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.top_overdue.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Sad msg={"No data available..."} Sad />
                  </TableCell>
                </TableRow>
              ) : (
                data.top_overdue.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                    <TableCell>{item.student_name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.total_books}</TableCell>
                    <TableCell>{item.date_rented}</TableCell>
                    <TableCell>{item.days_overdue}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mt: 3, border: 1, borderColor: "grey.400", p: 3 }}>
        <Typography variant="h7">Top 10 Books</Typography>
        <TableContainer sx={{ mt: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Book</TableCell>
                <TableCell>Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.top_books.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Sad msg={"No data available..."} Sad />
                  </TableCell>
                </TableRow>
              ) : (
                data.top_books.map((item, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                      <TableCell>{item.book_title}</TableCell>
                      <TableCell>{item.rented_count}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
