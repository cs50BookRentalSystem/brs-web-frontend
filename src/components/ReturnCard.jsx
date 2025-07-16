import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";

export default function ReturnCard({ student }) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{student.name}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Student Card ID: {student.student_id}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{ width: 120, height: 36 }}
            onClick={() => {}}
          >
            Receive
          </Button>
        </Box>
        <Box sx={{ mt: 1 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Book Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {student.books.map((book, idx) => {
                  return (
                    <TableRow>
                      <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                      <TableCell>{book}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
}
