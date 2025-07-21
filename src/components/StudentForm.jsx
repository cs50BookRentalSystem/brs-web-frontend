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

import { useRef } from "react";

export default function StudentForm({ open, setOpen, addFn }) {
  const cardRef = useRef();
  const fnameRef = useRef();
  const lnameRef = useRef();
  const majorRef = useRef();
  const phoneRef = useRef();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>ADD NEW STUDENT</DialogTitle>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const newStudent = {
            card_id: cardRef.current.value,
            first_name: fnameRef.current.value,
            last_name: lnameRef.current.value,
            major: majorRef.current.value,
            phone: phoneRef.current.value,
          };
          addFn(newStudent);
        }}
      >
        <DialogContent>
          <TextField
            type="text"
            placeholder="Student Card ID"
            inputRef={cardRef}
            sx={{ mt: 1 }}
            required
            fullWidth
          />
          <TextField
            type="text"
            placeholder="First Name"
            inputRef={fnameRef}
            sx={{ mt: 1 }}
            multiline
            required
            fullWidth
          />
          <TextField
            type="text"
            placeholder="Last Name"
            inputRef={lnameRef}
            sx={{ mt: 1 }}
            multiline
            required
            fullWidth
          />
          <FormControl sx={{ mt: 1 }} required fullWidth>
            <InputLabel id="major-select">Major</InputLabel>
            <Select labelId="major-select" label="Major" inputRef={majorRef}>
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
            inputRef={phoneRef}
            slotProps={{
              input: {
                inputMode: "tel",
                pattern: "[0-9]*",
              },
            }}
            sx={{ mt: 1 }}
            required
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
