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

export default function ReturnCard({ student, cardId, receiveFn }) {
  return (
    <Card>
      <CardContent>
        <Box
          component={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            const data = {
              cart_id: student[0].cart_id,
            };
            receiveFn(data);
          }}
          sx={{ display: "flex" }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{student[0].student_name}</Typography>
            <Typography variant="subtitle2" gutterBottom>
              Student Card ID: {cardId}
            </Typography>
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: 120, height: 36 }}
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
                {student.map((book, idx) => {
                  return (
                    <TableRow key={book.rent_id}>
                      <TableCell sx={{ width: 60 }}>{idx + 1}</TableCell>
                      <TableCell>{book.book_title}</TableCell>
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
