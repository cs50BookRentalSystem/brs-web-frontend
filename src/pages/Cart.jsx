import { Box, Typography, Button } from "@mui/material";

import CartTable from "../components/CartTable";
import CartStudentForm from "../components/CartStudentForm";
import ConfirmDialog from "../components/ConfirmDialog";

import { useApp } from "../App";

import { useMutation } from "@tanstack/react-query";
import { useState, useRef } from "react";

const api = import.meta.env.VITE_API;

export default function Cart() {
  const cardIdRef = useRef();
  const { cartItems, setCartItems, setGlobalMsg } = useApp();
  const [foundStudent, setFoundStudent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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
      if (!res.ok) throw new Error("Failed to fetch data...");
      return res.json();
    },
    onSuccess: () => {
      setFoundStudent(true);
    },
    onError: () => {
      setFoundStudent(false);
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
      setOpenDialog(false);
      setGlobalMsg("Checkout completes successfully...");
      setCartItems([]);
      setFoundStudent(false);
      resetStudent();
      cardIdRef.current.value = "";
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          setOpenDialog(true);
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
          disabled={!foundStudent || cartItems.length <= 0}
        >
          Complete Cart
        </Button>
      </Box>

      <ConfirmDialog
        msg={"Are you sure you want to checkout?"}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={() => {
          const completeCartData = {
            book_ids: cartItems.map((item) => item.id),
            student_id: studentData?.id,
          };
          completeCart.mutate(completeCartData);
        }}
      />

      <CartTable books={cartItems} removeFromCart={removeFromCart} />
      <CartStudentForm
        found={foundStudent}
        student={studentData}
        cardIdRef={cardIdRef}
        searchFn={searchStudent}
      />
    </>
  );
}
