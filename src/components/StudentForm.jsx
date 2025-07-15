import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Button,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function StudentForm({ open, setOpen }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ADD NEW STUDENT</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <TextField
            type="text"
            placeholder="Student ID"
            sx={{ mt: 1 }}
            fullWidth
          />
          <TextField
            type="text"
            placeholder="First Name"
            sx={{ mt: 1 }}
            multiline
            fullWidth
          />
          <TextField
            type="text"
            placeholder="Last Name"
            sx={{ mt: 1 }}
            multiline
            fullWidth
          />
          <FormControl sx={{ mt: 1 }} fullWidth>
            <InputLabel id="major-select">Major</InputLabel>
            <Select labelId="major-select" label="Major">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Computer Science"}>Computer Science</MenuItem>
              <MenuItem value={"Computer Engineering"}>
                Computer Engineering
              </MenuItem>
              <MenuItem value={"Artificial Intelligence"}>
                Artificial Intelligence
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            type="text"
            placeholder="Phone Number"
            slotProps={{
              input: {
                inputMode: "tel",
                pattern: "[0-9]*",
              },
            }}
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
