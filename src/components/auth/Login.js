

"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import Link from "next/link";

function Login() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login success:", data);

      // Redirect based on role (adjust roles as per your backend)
      switch (data.user.role) {
        case "user":
          window.location.href = "/admin-products/";
          break;
             case "admin":
          window.location.href = "/admin-products/";
          break;
     
        default:
          window.location.href = "/login";
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: theme.spacing(4),
              borderRadius: theme.shape.borderRadius * 2,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  background:
                    "linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Welcome Back
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to access your account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius * 2,
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius * 2,
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: theme.shape.borderRadius * 2,
                  padding: theme.spacing(1.5),
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
              <Box textAlign={"center"}>
                <Link href={"/"}>
                <Typography>back</Typography>
                </Link>
              </Box>
            </form>

          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Login;
