import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

import { Delete as DeleteIcon } from "@mui/icons-material";

export default function CartTable({ books }) {
  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper}>
        <Table size="large">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Book Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, idx) => {
              return (
                <TableRow>
                  <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                  <TableCell>{book}</TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
