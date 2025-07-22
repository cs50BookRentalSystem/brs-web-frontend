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

import { useQuery } from "@tanstack/react-query";

const api = import.meta.env.VITE_API;

export default function Report() {
  const overdues = [
    {
      name: "Elon Musk",
      phone: "0923456789",
      count: 3,
      date: "2025-05-22",
      days: 5,
    },
    {
      name: "Elon Musk",
      phone: "0923456789",
      count: 3,
      date: "2025-05-22",
      days: 5,
    },
  ];
  const books = [
    {
      name: "Harry Potter 1",
      count: 5,
    },
    {
      name: "Lord of the Ring",
      count: 3,
    },
  ];

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const res = await fetch(`${api}/reports`, {
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
        <Button variant="contained" onClick={() => setOpen(true)}>
          Table Report
        </Button>
      </Box>
      <Box display={"flex"} gap="2" sx={{ mt: 3 }}>
        <ScoreCard title={"# Book Rented"} value={data.total_rents} />
        <ScoreCard title={"# Student Rentees"} value={data.total_students} />
      </Box>
      <Box sx={{ mt: 3, border: 1, borderColor: "grey.400", p: 3 }}>
        <Typography variant="h7">Top 10 Overdues</Typography>
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
              {overdues.map((item, idx) => {
                return (
                  <TableRow key={idx}>
                    <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.count}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.days}</TableCell>
                  </TableRow>
                );
              })}
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
              {data.top_books &&
                data.top_books.map((item, idx) => {
                  return (
                    <TableRow key={idx}>
                      <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.count}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
