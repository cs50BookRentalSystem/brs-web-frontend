import { useNavigate } from "react-router-dom";
import { useApp } from "../App";
import {
  Paper,
  Box,
  Typography,
  Alert,
  TextField,
  Button,
} from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  //   const { setAuth } = useApp();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper sx={{ mt: 9, p: 5, width: 500 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            sx={{
              m: 1,
              height: 48,
              width: "auto",
            }}
          />
        </Box>

        <Typography variant="h4">Login</Typography>
        <Alert severity="warning" sx={{ mt: 1 }}>
          All fields required
        </Alert>

        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            gap: 1,
          }}
        >
          <TextField placeholder="Username" fullWidth />
          <TextField type="password" placeholder="Password" fullWidth />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
