import { Box, Typography, Button } from "@mui/material";

import CartTable from "../components/CartTable";
import CartStudentForm from "../components/CartStudentForm";

import { useApp } from "../App";

export default function Cart() {
  const { cartItems, setCartItems } = useApp();
  const { found, student } = {
    found: true,
    student: {
      name: "Elon Musk",
      major: "Computer Science",
      phone: "09123456789",
    },
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
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
      <CartTable books={cartItems} removeFromCart={removeFromCart} />
      <CartStudentForm found={found} student={student} />
    </>
  );
}
