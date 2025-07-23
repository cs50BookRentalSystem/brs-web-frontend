import { Box, Typography, Button } from "@mui/material";

import CartTable from "../components/CartTable";
import CartStudentForm from "../components/CartStudentForm";

import { useApp } from "../App";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const api = import.meta.env.VITE_API;

export default function Cart() {
  const { cartItems, setCartItems } = useApp();
  const [found, setFound] = useState(false);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const { mutate, error, data } = useMutation({
    mutationFn: async (cardId) => {
      const res = await fetch(`${api}/students/${cardId}`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch data...", res.status);
      return res.json();
    },
    onSuccess: () => {
      setFound(true);
    },
    onError: (error) => {
      setFound(false);
    },
  });

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" component="div">
          Cart
        </Typography>
        <Button
          type="submit"
          variant="contained"
          disabled={!found || cartItems.length <= 0}
          onClick={() => {}}
        >
          Complete Cart
        </Button>
      </Box>
      <CartTable books={cartItems} removeFromCart={removeFromCart} />
      <CartStudentForm found={found} student={data} searchFn={mutate} />
    </>
  );
}
