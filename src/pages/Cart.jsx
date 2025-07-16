import { Box, Typography, Button } from "@mui/material";
import CartTable from "../components/CartTable";
import CartStudentForm from "../components/CartStudentForm";

export default function Cart() {
  const books = ["Harry Potter 1", "Lord of the Ring", "Seven Kingdoms"];
  const { found, student } = {
    found: true,
    student: {
      name: "Elon Musk",
      major: "Computer Science",
      phone: "09123456789",
    },
  };
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
          Cart
        </Typography>
        <Button variant="contained" disabled={!found} onClick={() => {}}>
          Complete Cart
        </Button>
      </Box>
      <CartTable books={books} />
      <CartStudentForm found={found} student={student} />
    </>
  );
}
