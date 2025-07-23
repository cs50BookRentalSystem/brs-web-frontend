import { Box, Typography, Button } from "@mui/material";

import CartTable from "../components/CartTable";
import CartStudentForm from "../components/CartStudentForm";

import { useApp } from "../App";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const api = import.meta.env.VITE_API;

export default function Cart() {
  const { cartItems, setCartItems, setGlobalMsg } = useApp();
  const [found, setFound] = useState(false);

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const {
    mutate: searchStudent,
    data: studentData,
    reset: resetStudent,
  } = useMutation({
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

  const completeCart = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`${api}/rents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to fetch data...");
      return res.json();
    },
    onSuccess: () => {
      setGlobalMsg("Checkout completes successfully...");
      setCartItems([]);
      setFound(false);
      resetStudent();
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const completeCartData = {
            book_ids: cartItems.map((item) => item.id),
            student_id: studentData?.id,
          };
          completeCart.mutate(completeCartData);
        }}
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
        >
          Complete Cart
        </Button>
      </Box>
      <CartTable books={cartItems} removeFromCart={removeFromCart} />
      <CartStudentForm
        found={found}
        student={studentData}
        searchFn={searchStudent}
      />
    </>
  );
}
