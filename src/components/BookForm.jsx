import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  DialogActions,
} from "@mui/material";

import { useRef } from "react";

export default function BookForm({ open, setOpen, addFn }) {
  const titleRef = useRef();
  const descRef = useRef();
  const numRef = useRef();
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ADD NEW BOOK</DialogTitle>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const newBook = {
            title: titleRef.current.value,
            description: descRef.current.value,
            count: parseInt(numRef.current.value),
          };
          addFn(newBook);
        }}
      >
        <DialogContent>
          <TextField
            type="text"
            placeholder="Title"
            inputRef={titleRef}
            sx={{ mt: 1 }}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="Description"
            inputRef={descRef}
            sx={{ mt: 1 }}
            multiline
            fullWidth
          />
          <TextField
            type="number"
            placeholder="Number of Books"
            inputRef={numRef}
            sx={{ mt: 1 }}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
