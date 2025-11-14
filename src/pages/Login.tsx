import React, { useState } from "react";
import { Button, Typography, InputAdornment, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ReceiptList from "./ReceiptList";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Visibility, VisibilityOff, Person, Lock } from "@mui/icons-material";

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", password: "" });
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = { name: "", password: "" };
    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setReceiptOpen(true);
      setName("");
      setPassword("");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Box
        className="fade-in"
        sx={{
          display: "flex",
          flexDirection: "row",
          bgcolor: "white",
          borderRadius: 4,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
          overflow: "hidden",
          maxWidth: "900px",
        }}
      >
        <Box
          sx={{
            width: { xs: "0", sm: "400px" },
            minWidth: "250px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
            color: "white",
          }}
        >
          <Box
            sx={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=880&auto=format&fit=crop"
              alt="Logo"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
            />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "center", opacity: 0.9 }}>
            Manage your receipts efficiently with our modern platform
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 6,
            minWidth: "350px",
          }}
          autoComplete="off"
        >
          <Typography
            variant="h4"
            sx={{ mb: 1, fontWeight: 700, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            Sign In
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: "text.secondary" }}>
            Enter your credentials to continue
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="Username"
            sx={{ mb: 2, width: "100%" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: "#667eea" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            sx={{ mb: 2, width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: "#667eea" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="body2"
            sx={{
              alignSelf: "flex-end",
              mb: 3,
              color: "#667eea",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot Password?
          </Typography>
          <Button
            variant="contained"
            type="submit"
            sx={{
              width: "100%",
              marginBottom: "15px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              py: 1.5,
              fontWeight: 600,
              "&:hover": {
                background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
              },
            }}
          >
            Login
          </Button>
          <Button
            variant="text"
            size="medium"
            onClick={() => navigate("/")}
            sx={{ color: "#667eea" }}
          >
            <ArrowBackIosIcon fontSize="small" /> Back to home
          </Button>
        </Box>
      </Box>

      <ReceiptList open={receiptOpen} onClose={() => setReceiptOpen(false)} />
    </Box>
  );
}
