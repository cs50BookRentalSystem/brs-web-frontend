import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  DialogActions,
} from "@mui/material";

export default function BookForm({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ADD NEW BOOK</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField type="text" placeholder="Title" sx={{ mt: 1 }} fullWidth />
          <TextField
            type="text"
            placeholder="Author"
            sx={{ mt: 1 }}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="Description"
            sx={{ mt: 1 }}
            multiline
            fullWidth
          />
          <TextField
            type="number"
            placeholder="Number of Books"
            sx={{ mt: 1 }}
            fullWidth
          />
        </Box>
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
        <Button variant="contained" onClick={() => {}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
