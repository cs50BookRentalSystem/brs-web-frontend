import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Paper,
  Box,
  Typography,
  Alert,
  TextField,
  Button,
} from "@mui/material";

const api = "http://localhost:8080";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await fetch(`${api}/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                user: username,
                pass: password,
              }),
            });
            res.ok ? navigate("/") : alert("Login failed...");
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            gap: 1,
          }}
        >
          <TextField
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
