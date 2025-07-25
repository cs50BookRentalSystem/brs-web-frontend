import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
} from "@mui/material";

export default function ConfirmDialog({ msg, open, onClose, onConfirm }) {
  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
      }}
    >
      <Box sx={{ pr: 1.5, pb: 1.5 }}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>{msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => onConfirm()} variant="contained" color="error">
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
